import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';

import type { CategoryInfo } from '../../../core/domain/models/category';
import { ArticleState } from '../../state/article.state';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryCard {
  readonly category = input.required<CategoryInfo>();

  private readonly articleState = inject(ArticleState);
  private readonly router = inject(Router);

  protected readonly count = computed(() => {
    const name = this.category().name;
    return name === 'Todas'
      ? this.articleState.articles().length
      : this.articleState.categoryCounts()[name];
  });

  protected navigateToCategory(): void {
    this.articleState.setCategory(this.category().name);
    void this.router.navigate(['/noticias']);
  }
}