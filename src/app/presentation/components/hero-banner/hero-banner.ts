import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { Article } from '../../../core/domain/models/article';
import { FavoriteState } from '../../state/favorite.state';

@Component({
  selector: 'app-hero-banner',
  imports: [RouterLink],
  templateUrl: './hero-banner.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroBanner {
  readonly article = input.required<Article>();

  private readonly favoriteState = inject(FavoriteState);

  protected isFavorite(id: string): boolean {
    return this.favoriteState.isFavorite(id);
  }

  protected toggleFavorite(id: string): void {
    void this.favoriteState.toggle(id);
  }
}