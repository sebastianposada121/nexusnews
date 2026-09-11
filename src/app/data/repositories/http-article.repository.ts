import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import type { Article } from '../../core/domain/models/article';
import type { ArticleRepository } from '../../core/domain/repositories/article.repository';
import { ArticleMapper } from '../mappers/article.mapper';
import { API_BASE_URL } from '../../infrastructure/http/api-base-url';

@Injectable()
export class HttpArticleRepository implements ArticleRepository {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Article[]> {
    return this.http
      .get<Partial<Article>[]>(`${API_BASE_URL}/articles`)
      .pipe(map((items) => items.map((item) => ArticleMapper.fromJson(item))));
  }

  getById(id: string): Observable<Article | undefined> {
    return this.http
      .get<Partial<Article>>(`${API_BASE_URL}/articles/${id}`)
      .pipe(map((item) => ArticleMapper.fromJson(item)));
  }

  create(article: Article): Observable<Article> {
    return this.http
      .post<Partial<Article>>(`${API_BASE_URL}/articles`, article)
      .pipe(map((item) => ArticleMapper.fromJson(item)));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/articles/${id}`);
  }

  reset(): Observable<Article[]> {
    return this.http
      .post<Partial<Article>[]>(`${API_BASE_URL}/articles/reset`, null)
      .pipe(map((items) => items.map((item) => ArticleMapper.fromJson(item))));
  }
}