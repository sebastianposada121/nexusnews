import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import type { Article } from '../models/article';

export interface ArticleRepository {
  getAll(): Observable<Article[]>;
  getById(id: string): Observable<Article | undefined>;
  create(article: Article): Observable<Article>;
  delete(id: string): Observable<void>;
  reset(): Observable<Article[]>;
}

export const ARTICLE_REPOSITORY = new InjectionToken<ArticleRepository>('ARTICLE_REPOSITORY');