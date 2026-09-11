import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import type { CategoryFilter } from '../../../core/domain/models/category';
import { CATEGORIES } from '../../../core/domain/models/category';
import { ArticleState } from '../../state/article.state';
import { ArticleCard } from '../../components/article-card/article-card';
import { EmptyState } from '../../components/empty-state/empty-state';

@Component({
  selector: 'app-news-page',
  imports: [ArticleCard, EmptyState],
  templateUrl: './news.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsPage {
  protected readonly articleState = inject(ArticleState);

  protected readonly filteredArticles = this.articleState.filteredArticles;
  protected readonly selectedCategory = this.articleState.selectedCategory;
  protected readonly categories = CATEGORIES;

  protected filterBy(category: CategoryFilter): void {
    this.articleState.setCategory(category);
  }

  protected onSearchInput(event: Event): void {
    this.articleState.setSearchQuery((event.target as HTMLInputElement).value);
  }

  protected resetFilters(): void {
    this.articleState.resetFilters();
  }

  protected categoryPillClass(isActive: boolean): string {
    return isActive
      ? 'px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-sm transition-all'
      : 'px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all';
  }
}