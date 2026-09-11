export type ArticleCategory = 'Tecnología' | 'Educación' | 'Turismo' | 'Comercio';

export interface Article {
  id: string;
  title: string;
  category: ArticleCategory;
  summary: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  isFeatured: boolean;
  views: number;
}

export interface ArticleDraft {
  title: string;
  category: ArticleCategory;
  summary: string;
  content: string;
  image: string;
  author: string;
  isFeatured: boolean;
}