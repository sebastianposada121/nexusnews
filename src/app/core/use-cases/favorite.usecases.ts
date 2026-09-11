import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { FAVORITE_REPOSITORY } from '../domain/repositories/favorite.repository';

@Injectable({ providedIn: 'root' })
export class FavoriteUseCases {
  private readonly favoriteRepository = inject(FAVORITE_REPOSITORY);

  load(): Observable<string[]> {
    return this.favoriteRepository.getAll();
  }

  persist(ids: string[]): Observable<void> {
    return this.favoriteRepository.save(ids);
  }

  toggle(ids: string[], id: string): string[] {
    return ids.includes(id) ? ids.filter((f) => f !== id) : [...ids, id];
  }
}