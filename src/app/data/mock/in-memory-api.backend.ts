import { Injectable } from '@angular/core';
import {
  HttpBackend,
  HttpErrorResponse,
  HttpEvent,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, delay, of, throwError } from 'rxjs';

import type { Article } from '../../core/domain/models/article';
import type { ArticleComment, NewArticleComment } from '../../core/domain/models/article-comment';
import type { Testimonial } from '../../core/domain/models/testimonial';
import { SEED_ARTICLES, SEED_COMMENTS, SEED_TESTIMONIALS } from './seed-data';

interface RouteResult {
  status: number;
  body: unknown;
}

@Injectable()
export class InMemoryApiBackend implements HttpBackend {
  private readonly articles: Article[] = SEED_ARTICLES.map((a) => ({ ...a }));
  private readonly comments: ArticleComment[] = SEED_COMMENTS.map((c) => ({ ...c }));
  private readonly testimonials: Testimonial[] = SEED_TESTIMONIALS.map((t) => ({ ...t }));
  private unknownRef = 0;

  handle(req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
    const url = new URL(req.urlWithParams, 'http://localhost');
    const segments = url.pathname.split('/').filter(Boolean);

    let result: RouteResult;
    try {
      result = this.dispatch(req.method, segments, url, req.body);
    } catch (error) {
      result = { status: 400, body: { message: (error as Error).message } };
    }

    const ok = result.status >= 200 && result.status < 300;

    if (!ok) {
      return throwError(() => new HttpErrorResponse({ status: result.status, error: result.body })).pipe(
        delay(this.latency())
      );
    }

    return of(new HttpResponse({ status: result.status, body: result.body })).pipe(
      delay(this.latency())
    );
  }

  private dispatch(
    method: string,
    segments: string[],
    url: URL,
    body: unknown
  ): RouteResult {
    if (segments[0] !== 'api') {
      return { status: 404, body: { message: `Ruta desconocida: /${segments.join('/')}` } };
    }

    switch (segments[1]) {
      case 'articles':
        return this.handleArticles(method, segments, body);
      case 'comments':
        return this.handleComments(method, url.searchParams.get('articleId'), body);
      case 'testimonials':
        return this.handleTestimonials(method);
      default:
        return { status: 404, body: { message: 'Recurso no encontrado' } };
    }
  }

  private handleArticles(method: string, segments: string[], body: unknown): RouteResult {
    const id = segments[2];
    const isReset = id === 'reset';

    if (method === 'POST' && isReset) {
      this.articles.length = 0;
      this.articles.push(...SEED_ARTICLES.map((a) => ({ ...a })));
      return { status: 200, body: this.articles };
    }

    if (method === 'GET' && !id) {
      return { status: 200, body: this.articles };
    }
    if (method === 'GET' && id) {
      const article = this.articles.find((a) => a.id === id);
      return article ? { status: 200, body: article } : this.notFound(`Artículo ${id}`);
    }
    if (method === 'POST') {
      const article = body as Article;
      this.articles.unshift(article);
      return { status: 201, body: article };
    }
    if (method === 'DELETE' && id) {
      const index = this.articles.findIndex((a) => a.id === id);
      if (index === -1) {
        return this.notFound(`Artículo ${id}`);
      }
      this.articles.splice(index, 1);
      return { status: 200, body: null };
    }
    return { status: 405, body: { message: `Método no soportado: ${method}` } };
  }

  private handleComments(
    method: string,
    articleId: string | null,
    body: unknown
  ): RouteResult {
    if (method === 'GET') {
      const id = articleId ?? '';
      return { status: 200, body: this.comments.filter((c) => c.articleId === id) };
    }
    if (method === 'POST') {
      const input = body as NewArticleComment;
      if (!input || !input.text?.trim() || !input.articleId) {
        return { status: 400, body: { message: 'Comentario inválido' } };
      }
      const comment: ArticleComment = {
        id: `c-${Date.now()}-${this.unknownRef++}`,
        articleId: input.articleId,
        author: input.author?.trim() || 'Lector Anónimo',
        text: input.text.trim(),
        date: 'Hace un momento'
      };
      this.comments.unshift(comment);
      return { status: 201, body: comment };
    }
    return { status: 405, body: { message: `Método no soportado: ${method}` } };
  }

  private handleTestimonials(method: string): RouteResult {
    if (method === 'GET') {
      return { status: 200, body: this.testimonials };
    }
    return { status: 405, body: { message: `Método no soportado: ${method}` } };
  }

  private notFound(message: string): RouteResult {
    return { status: 404, body: { message: `${message} no encontrado` } };
  }

  private latency(): number {
    return 150 + Math.random() * 250;
  }
}