import { describe, expect, it } from 'vitest';

import type { Article } from '../../core/domain/models/article';
import { ArticleMapper } from './article.mapper';

describe('ArticleMapper', () => {
  it('normaliza un origen parcial con valores por defecto', () => {
    const article = ArticleMapper.fromJson({ title: 'Título de prueba' });

    expect(article.title).toBe('Título de prueba');
    expect(article.category).toBe('Tecnología');
    expect(article.readTime).toBe('4 min de lectura');
    expect(article.views).toBe(0);
    expect(article.isFeatured).toBe(false);
  });

  it('resuelve una categoría inválida a la categoría por defecto', () => {
    const article = ArticleMapper.fromJson({ category: 'Deportes' } as unknown as Partial<Article>);

    expect(article.category).toBe('Tecnología');
  });

  it('maneja entradas nulas sin fallar', () => {
    const article = ArticleMapper.fromJson(null);

    expect(article.id).toMatch(/^art-/);
    expect(article.title).toBe('Sin título');
    expect(article.author).toBe('Redactor Nexus News');
  });
});