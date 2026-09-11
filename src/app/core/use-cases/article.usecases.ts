import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import type { Article, ArticleDraft } from '../domain/models/article';
import { ARTICLE_REPOSITORY } from '../domain/repositories/article.repository';

@Injectable({ providedIn: 'root' })
export class ArticleUseCases {
  private readonly articleRepository = inject(ARTICLE_REPOSITORY);

  loadAll(): Observable<Article[]> {
    return this.articleRepository.getAll();
  }

  loadById(id: string): Observable<Article | undefined> {
    return this.articleRepository.getById(id);
  }

  create(draft: ArticleDraft): Observable<Article> {
    const article: Article = {
      ...draft,
      id: this.generateId('art'),
      date: this.formatDate(new Date()),
      readTime: '4 min de lectura',
      views: 0
    };
    return this.articleRepository.create(article);
  }

  remove(id: string): Observable<void> {
    return this.articleRepository.delete(id);
  }

  reset(): Observable<Article[]> {
    return this.articleRepository.reset();
  }

  private generateId(prefix: string): string {
    return `${prefix}-${Date.now()}`;
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  }
}