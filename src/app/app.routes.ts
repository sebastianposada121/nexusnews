import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./presentation/pages/home/home.page').then((m) => m.HomePage)
  },
  {
    path: 'noticias',
    loadComponent: () =>
      import('./presentation/pages/news/news.page').then((m) => m.NewsPage)
  },
  {
    path: 'noticias/:id',
    loadComponent: () =>
      import('./presentation/pages/article-detail/article-detail.page').then(
        (m) => m.ArticleDetailPage
      )
  },
  {
    path: 'favoritos',
    loadComponent: () =>
      import('./presentation/pages/favorites/favorites.page').then((m) => m.FavoritesPage)
  },
  {
    path: 'gestion',
    loadComponent: () =>
      import('./presentation/pages/crud/crud.page').then((m) => m.CrudPage)
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./presentation/pages/contact/contact.page').then((m) => m.ContactPage)
  },
  { path: '**', redirectTo: '' }
];