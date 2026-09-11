import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import type { ArticleComment, NewArticleComment } from '../models/article-comment';

export interface CommentRepository {
  getByArticle(articleId: string): Observable<ArticleComment[]>;
  add(comment: NewArticleComment): Observable<ArticleComment>;
}

export const COMMENT_REPOSITORY = new InjectionToken<CommentRepository>('COMMENT_REPOSITORY');