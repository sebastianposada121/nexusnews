import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ArticleState } from '../../state/article.state';
import { FavoriteState } from '../../state/favorite.state';
import { ArticleForm } from '../../components/article-form/article-form';

@Component({
  selector: 'app-crud-page',
  imports: [RouterLink, ArticleForm],
  templateUrl: './crud.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudPage {
  protected readonly articleState = inject(ArticleState);
  protected readonly favoriteState = inject(FavoriteState);

  protected readonly articles = this.articleState.articles;

  protected async deleteArticle(id: string): Promise<void> {
    await this.articleState.remove(id);
    await this.favoriteState.clearId(id);
  }

  protected restoreDefaults(): void {
    void this.articleState.reset();
  }
}