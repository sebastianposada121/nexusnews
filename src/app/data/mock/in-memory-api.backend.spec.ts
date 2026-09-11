import { HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { describe, expect, it } from 'vitest';
import { firstValueFrom } from 'rxjs';

import type { Article } from '../../core/domain/models/article';
import type { Testimonial } from '../../core/domain/models/testimonial';
import { InMemoryApiBackend } from './in-memory-api.backend';
import { SEED_ARTICLES, SEED_TESTIMONIALS } from './seed-data';

const asEvent = (event: HttpEvent<unknown>): HttpResponse<unknown> =>
  event as HttpResponse<unknown>;

const asBody = <T>(event: HttpEvent<unknown>): T => asEvent(event).body as T;

const newDraft = (): Article => ({
  id: 'art-test',
  title: 'Artículo de prueba',
  category: 'Tecnología',
  summary: 'Resumen breve',
  content: 'Contenido completo del artículo de prueba.',
  image: 'https://images.unsplash.com/photo-test',
  author: 'Autor Test',
  date: '11 de Septiembre, 2026',
  readTime: '4 min de lectura',
  isFeatured: false,
  views: 0
});

describe('InMemoryApiBackend', () => {
  const backend = new InMemoryApiBackend();

  it('lista los artículos semilla', async () => {
    const response = await firstValueFrom(backend.handle(new HttpRequest('GET', '/api/articles')));

    expect(asEvent(response).status).toBe(200);
    expect(Array.isArray(asBody(response))).toBe(true);
    expect(asBody<Article[]>(response).length).toBe(SEED_ARTICLES.length);
  });

  it('devuelve un artículo por id', async () => {
    const response = await firstValueFrom(backend.handle(new HttpRequest('GET', '/api/articles/art-1')));

    expect(asEvent(response).status).toBe(200);
    expect(asBody<Article>(response).id).toBe('art-1');
  });

  it('lista los testimonios semilla', async () => {
    const response = await firstValueFrom(backend.handle(new HttpRequest('GET', '/api/testimonials')));

    expect(asEvent(response).status).toBe(200);
    expect(asBody<Testimonial[]>(response).length).toBe(SEED_TESTIMONIALS.length);
  });

  it('rechaza métodos no soportados en testimonios', async () => {
    await expect(
      firstValueFrom(backend.handle(new HttpRequest('POST', '/api/testimonials', null)))
    ).rejects.toMatchObject({ status: 405 });
  });

  it('devuelve 404 para un artículo inexistente', async () => {
    await expect(
      firstValueFrom(backend.handle(new HttpRequest('GET', '/api/articles/art-unknown')))
    ).rejects.toMatchObject({ status: 404 });
  });

  it('crea y luego elimina un artículo', async () => {
    const created = await firstValueFrom(
      backend.handle(new HttpRequest('POST', '/api/articles', newDraft()))
    );
    expect(asEvent(created).status).toBe(201);

    const list = await firstValueFrom(backend.handle(new HttpRequest('GET', '/api/articles')));
    expect(asBody<Article[]>(list)).toHaveLength(SEED_ARTICLES.length + 1);

    const deleted = await firstValueFrom(
      backend.handle(new HttpRequest('DELETE', '/api/articles/art-test'))
    );
    expect(asEvent(deleted).status).toBe(200);

    const listAfter = await firstValueFrom(backend.handle(new HttpRequest('GET', '/api/articles')));
    expect(asBody<Article[]>(listAfter)).toHaveLength(SEED_ARTICLES.length);
  });

  it('restablece los artículos a los valores iniciales', async () => {
    await firstValueFrom(backend.handle(new HttpRequest('POST', '/api/articles', newDraft())));

    const reset = await firstValueFrom(
      backend.handle(new HttpRequest('POST', '/api/articles/reset', null))
    );

    expect(asBody<Article[]>(reset)).toHaveLength(SEED_ARTICLES.length);
    expect(asBody<Article[]>(reset).map((a) => a.id)).toContain('art-1');
  });

  it('agrega comentarios y los filtra por artículo', async () => {
    await firstValueFrom(
      backend.handle(
        new HttpRequest('POST', '/api/comments', {
          articleId: 'art-2',
          author: 'Lector Test',
          text: 'Muy interesante'
        })
      )
    );

    const response = await firstValueFrom(
      backend.handle(new HttpRequest('GET', '/api/comments?articleId=art-2'))
    );

    expect(asEvent(response).status).toBe(200);
    expect(asBody<Array<{ author: string }>>(response)).toHaveLength(1);
    expect(asBody<Array<{ author: string }>>(response)[0].author).toBe('Lector Test');
  });

  it('rechaza comentarios inválidos', async () => {
    await expect(
      firstValueFrom(
        backend.handle(
          new HttpRequest('POST', '/api/comments', { articleId: 'art-3', text: '' })
        )
      )
    ).rejects.toMatchObject({ status: 400 });
  });
});