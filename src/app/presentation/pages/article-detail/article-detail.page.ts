import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ArticleState } from '../../state/article.state';
import { CommentState } from '../../state/comment.state';
import { FavoriteState } from '../../state/favorite.state';
import { ToastService } from '../../shared/toast.service';
import { CommentForm } from '../../components/comment-form/comment-form';
import { CommentList } from '../../components/comment-list/comment-list';

@Component({
  selector: 'app-article-detail-page',
  imports: [RouterLink, CommentForm, CommentList],
  templateUrl: './article-detail.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);

  protected readonly articleState = inject(ArticleState);
  protected readonly commentState = inject(CommentState);
  protected readonly favoriteState = inject(FavoriteState);

  protected readonly article = this.articleState.selectedArticle;
  protected readonly comments = this.commentState.comments;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    this.articleState.select(id);
    void this.commentState.loadForArticle(id);
  }

  protected isFavorite(id: string): boolean {
    return this.favoriteState.isFavorite(id);
  }

  protected toggleFavorite(id: string): void {
    void this.favoriteState.toggle(id);
  }

  protected share(): void {
    if (navigator.clipboard) {
      void navigator.clipboard.writeText(window.location.href);
      this.toast.show('Enlace de la noticia copiado al portapapeles', 'info');
    } else {
      this.toast.show('Enlace de la noticia compartido', 'info');
    }
  }
}