import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleState } from '../../state/article.state';
import { FavoriteState } from '../../state/favorite.state';
import { ArticleCard } from '../../components/article-card/article-card';
import { EmptyState } from '../../components/empty-state/empty-state';

@Component({
  selector: 'app-favorites-page',
  imports: [ArticleCard, EmptyState],
  templateUrl: './favorites.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesPage {
  protected readonly articleState = inject(ArticleState);
  protected readonly favoriteState = inject(FavoriteState);
  private readonly router = inject(Router);

  protected readonly favoriteArticles = computed(() =>
    this.articleState.byIds(this.favoriteState.ids())
  );

  protected clearAll(): void {
    void this.favoriteState.clearAll();
  }

  protected exploreNews(): void {
    void this.router.navigate(['/noticias']);
  }
}