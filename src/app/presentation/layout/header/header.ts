import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ArticleState } from '../../state/article.state';
import { FavoriteState } from '../../state/favorite.state';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {
  private readonly articleState = inject(ArticleState);
  protected readonly favoriteState = inject(FavoriteState);

  protected readonly searchQuery = this.articleState.searchQuery;
  protected readonly favoritesCount = this.favoriteState.count;
  protected readonly isMobileMenuOpen = signal(false);

  protected toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((open) => !open);
  }

  protected onSearchInput(event: Event): void {
    this.articleState.setSearchQuery((event.target as HTMLInputElement).value);
  }

  protected navButtonClass(isActive: boolean): string {
    return isActive
      ? 'px-4 py-2 rounded-xl text-sm font-bold bg-white text-indigo-600 shadow-sm transition-all flex items-center'
      : 'px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 transition-all flex items-center';
  }
}