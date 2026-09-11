import articlesJson from '../../../assets/data/articles.json';
import commentsJson from '../../../assets/data/comments.json';

import type { Article } from '../../core/domain/models/article';
import type { ArticleComment } from '../../core/domain/models/article-comment';
import type { Testimonial } from '../../core/domain/models/testimonial';
import { ArticleMapper } from '../mappers/article.mapper';

export const SEED_ARTICLES: Article[] = (
  articlesJson as unknown as Partial<Article>[]
).map((article) => ArticleMapper.fromJson(article));

export const SEED_COMMENTS: ArticleComment[] = (
  commentsJson as unknown as ArticleComment[]
).map((comment) => ({ ...comment }));

export const SEED_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Mariana Gutiérrez',
    role: 'Docente de Innovación Educativa',
    text: 'Nexus News se convirtió en mi fuente de referencia para llevar casos reales al aula. La sección de educación transformó mi forma de enseñar.',
    rating: 5,
    avatarColor: 'bg-indigo-600'
  },
  {
    id: 't-2',
    name: 'Ricardo Salinas',
    role: 'Emprendedor Tecnológico',
    text: 'La cobertura de tecnología y comercio digital me ayudó a escalar mi negocio. Información clara, oportuna y muy bien investigada.',
    rating: 5,
    avatarColor: 'bg-emerald-600'
  },
  {
    id: 't-3',
    name: 'Lucía Fernández',
    role: 'Guía de Turismo Sostenible',
    text: 'Encontré en sus reportajes las rutas más auténticas para mis viajeros. Un medio que promueve el turismo responsable de verdad.',
    rating: 4,
    avatarColor: 'bg-amber-600'
  }
];