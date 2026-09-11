import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import type { Article, ArticleCategory, ArticleDraft } from '../../core/domain/models/article';
import type { CategoryFilter } from '../../core/domain/models/category';
import { ArticleUseCases } from '../../core/use-cases/article.usecases';
import { ToastService } from '../shared/toast.service';

@Injectable({ providedIn: 'root' })
export class ArticleState {
  private readonly articleUseCases = inject(ArticleUseCases);
  private readonly toast = inject(ToastService);

  readonly articles = signal<Article[]>([]);
  readonly selectedArticleId = signal<string | null>(null);
  readonly searchQuery = signal('');
  readonly selectedCategory = signal<CategoryFilter>('Todas');
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly featuredArticles = computed(() => this.articles().filter((a) => a.isFeatured));

  readonly categoryCounts = computed(() => {
    const counts: Record<ArticleCategory, number> = {
      Tecnología: 0,
      Educación: 0,
      Turismo: 0,
      Comercio: 0
    };
    for (const article of this.articles()) {
      counts[article.category] += 1;
    }
    return counts;
  });

  readonly filteredArticles = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.selectedCategory();

    return this.articles().filter((article) => {
      const matchesCategory = category === 'Todas' || article.category === category;
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  });

  readonly selectedArticle = computed(() => {
    const id = this.selectedArticleId();
    return id ? this.articles().find((a) => a.id === id) ?? null : null;
  });

  async load(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const items = await firstValueFrom(this.articleUseCases.loadAll());
      this.articles.set(items);
    } catch (err) {
      const message = (err as Error).message;
      this.error.set(message);
      this.toast.show(message, 'danger');
    } finally {
      this.loading.set(false);
    }
  }

  async reset(): Promise<void> {
    this.loading.set(true);
    try {
      const items = await firstValueFrom(this.articleUseCases.reset());
      this.articles.set(items);
      this.toast.show('Noticias iniciales restablecidas', 'info');
    } catch (err) {
      this.toast.show((err as Error).message, 'danger');
    } finally {
      this.loading.set(false);
    }
  }

  select(id: string): void {
    this.selectedArticleId.set(id);
  }

  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  setCategory(category: CategoryFilter): void {
    this.selectedCategory.set(category);
  }

  resetFilters(): void {
    this.searchQuery.set('');
    this.selectedCategory.set('Todas');
  }

  async create(draft: ArticleDraft): Promise<boolean> {
    try {
      const created = await firstValueFrom(this.articleUseCases.create(draft));
      this.articles.update((list) => [created, ...list]);
      this.toast.show('¡Noticia publicada exitosamente!', 'success');
      return true;
    } catch (err) {
      this.toast.show((err as Error).message, 'danger');
      return false;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await firstValueFrom(this.articleUseCases.remove(id));
      this.articles.update((list) => list.filter((a) => a.id !== id));
      this.selectedArticleId.update((current) => (current === id ? null : current));
      this.toast.show('Noticia eliminada correctamente', 'danger');
    } catch (err) {
      this.toast.show((err as Error).message, 'danger');
    }
  }

  byIds(ids: string[]): Article[] {
    const idSet = new Set(ids);
    return this.articles().filter((a) => idSet.has(a.id));
  }

  categoryCount(category: ArticleCategory): number {
    return this.articles().filter((a) => a.category === category).length;
  }
}