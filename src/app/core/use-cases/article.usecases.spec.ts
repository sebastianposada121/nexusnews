import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { firstValueFrom, of } from 'rxjs';

import type { Article } from '../domain/models/article';
import { ARTICLE_REPOSITORY } from '../domain/repositories/article.repository';
import { ArticleUseCases } from './article.usecases';

describe('ArticleUseCases', () => {
  it('construye un artículo completo a partir de un borrador', async () => {
    const created: Article[] = [];

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ARTICLE_REPOSITORY,
          useValue: {
            create: (article: Article) => {
              created.push(article);
              return of(article);
            }
          }
        }
      ]
    });

    const useCases = TestBed.inject(ArticleUseCases);
    const result = await firstValueFrom(
      useCases.create({
        title: 'Nueva noticia',
        category: 'Turismo',
        summary: 'Resumen',
        content: 'Contenido completo de la noticia.',
        image: 'https://images.unsplash.com/photo-1',
        author: 'Autor Test',
        isFeatured: true
      })
    );

    expect(result.id).toMatch(/^art-/);
    expect(result.readTime).toBe('4 min de lectura');
    expect(result.views).toBe(0);
    expect(result.isFeatured).toBe(true);
    expect(result.date).toBeTruthy();
    expect(created).toHaveLength(1);
    expect(created[0].id).toBe(result.id);
  });
});