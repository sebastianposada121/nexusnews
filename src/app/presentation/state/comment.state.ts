import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import type { ArticleComment } from '../../core/domain/models/article-comment';
import { CommentUseCases } from '../../core/use-cases/comment.usecases';

@Injectable({ providedIn: 'root' })
export class CommentState {
  private readonly commentUseCases = inject(CommentUseCases);

  readonly comments = signal<ArticleComment[]>([]);
  readonly loading = signal(false);

  async loadForArticle(articleId: string): Promise<void> {
    this.loading.set(true);
    try {
      this.comments.set(await firstValueFrom(this.commentUseCases.getForArticle(articleId)));
    } finally {
      this.loading.set(false);
    }
  }

  async add(articleId: string, text: string, author = 'Lector Anónimo'): Promise<void> {
    const added = await firstValueFrom(this.commentUseCases.add(articleId, text, author));
    this.comments.update((list) => [added, ...list]);
  }
}