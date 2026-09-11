import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { FavoriteUseCases } from '../../core/use-cases/favorite.usecases';
import { ToastService } from '../shared/toast.service';

@Injectable({ providedIn: 'root' })
export class FavoriteState {
  private readonly favoriteUseCases = inject(FavoriteUseCases);
  private readonly toast = inject(ToastService);

  readonly ids = signal<string[]>([]);
  readonly loading = signal(false);

  readonly count = computed(() => this.ids().length);

  async load(): Promise<void> {
    this.loading.set(true);
    try {
      this.ids.set(await firstValueFrom(this.favoriteUseCases.load()));
    } finally {
      this.loading.set(false);
    }
  }

  isFavorite(id: string): boolean {
    return this.ids().includes(id);
  }

  async toggle(id: string): Promise<void> {
    const next = this.favoriteUseCases.toggle(this.ids(), id);
    this.ids.set(next);
    await firstValueFrom(this.favoriteUseCases.persist(next));
    const added = next.includes(id);
    this.toast.show(
      added ? 'Noticia agregada a tus favoritos' : 'Noticia removida de tus favoritos',
      added ? 'success' : 'info'
    );
  }

  async clearAll(): Promise<void> {
    this.ids.set([]);
    await firstValueFrom(this.favoriteUseCases.persist([]));
    this.toast.show('Lista de favoritos vaciada', 'info');
  }

  async clearId(id: string): Promise<void> {
    const next = this.ids().filter((f) => f !== id);
    this.ids.set(next);
    await firstValueFrom(this.favoriteUseCases.persist(next));
  }
}