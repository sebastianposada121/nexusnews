export interface ArticleComment {
  id: string;
  articleId: string;
  author: string;
  text: string;
  date: string;
}

export interface NewArticleComment {
  articleId: string;
  author: string;
  text: string;
}