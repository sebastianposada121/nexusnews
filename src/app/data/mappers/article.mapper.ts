import type { Article, ArticleCategory } from '../../core/domain/models/article';

const DEFAULT_CATEGORY: ArticleCategory = 'Tecnología';
const CATEGORY_VALUES: readonly ArticleCategory[] = [
  'Tecnología',
  'Educación',
  'Turismo',
  'Comercio'
];

export class ArticleMapper {
  static fromJson(source: Partial<Article> | null | undefined): Article {
    const category: ArticleCategory = CATEGORY_VALUES.includes(source?.category as ArticleCategory)
      ? (source?.category as ArticleCategory)
      : DEFAULT_CATEGORY;

    return {
      id: source?.id ?? `art-${Date.now()}`,
      title: source?.title ?? 'Sin título',
      category,
      summary: source?.summary ?? '',
      content: source?.content ?? '',
      image: source?.image ?? '',
      author: source?.author ?? 'Redactor Nexus News',
      date: source?.date ?? '',
      readTime: source?.readTime ?? '4 min de lectura',
      isFeatured: source?.isFeatured ?? false,
      views: source?.views ?? 0
    };
  }
}