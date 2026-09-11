import type { ArticleCategory } from './article';

export type CategoryFilter = ArticleCategory | 'Todas';

export interface CategoryInfo {
  name: ArticleCategory | 'Todas';
  icon: string;
  colorClass: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { name: 'Tecnología', icon: '💻', colorClass: 'bg-indigo-600' },
  { name: 'Educación', icon: '🎓', colorClass: 'bg-blue-600' },
  { name: 'Turismo', icon: '🌿', colorClass: 'bg-emerald-600' },
  { name: 'Comercio', icon: '📈', colorClass: 'bg-amber-600' }
];