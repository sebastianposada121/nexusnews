import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import type { ArticleComment, NewArticleComment } from '../../core/domain/models/article-comment';
import type { CommentRepository } from '../../core/domain/repositories/comment.repository';
import { API_BASE_URL } from '../../infrastructure/http/api-base-url';

@Injectable()
export class HttpCommentRepository implements CommentRepository {
  private readonly http = inject(HttpClient);

  getByArticle(articleId: string): Observable<ArticleComment[]> {
    return this.http.get<ArticleComment[]>(`${API_BASE_URL}/comments`, {
      params: { articleId }
    });
  }

  add(comment: NewArticleComment): Observable<ArticleComment> {
    return this.http.post<ArticleComment>(`${API_BASE_URL}/comments`, comment);
  }
}