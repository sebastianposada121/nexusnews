import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import type { ArticleComment, NewArticleComment } from '../domain/models/article-comment';
import { COMMENT_REPOSITORY } from '../domain/repositories/comment.repository';

@Injectable({ providedIn: 'root' })
export class CommentUseCases {
  private readonly commentRepository = inject(COMMENT_REPOSITORY);

  getForArticle(articleId: string): Observable<ArticleComment[]> {
    return this.commentRepository.getByArticle(articleId);
  }

  add(articleId: string, text: string, author: string): Observable<ArticleComment> {
    const comment: NewArticleComment = { articleId, text, author };
    return this.commentRepository.add(comment);
  }
}