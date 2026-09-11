import { TestBed } from '@angular/core/testing';
import { HttpBackend, provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { App } from './app';
import { ARTICLE_REPOSITORY } from './core/domain/repositories/article.repository';
import { COMMENT_REPOSITORY } from './core/domain/repositories/comment.repository';
import { FAVORITE_REPOSITORY } from './core/domain/repositories/favorite.repository';
import { InMemoryApiBackend } from './data/mock/in-memory-api.backend';
import { HttpArticleRepository } from './data/repositories/http-article.repository';
import { HttpCommentRepository } from './data/repositories/http-comment.repository';
import { LocalFavoriteRepository } from './data/repositories/local-favorite.repository';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: HttpBackend, useClass: InMemoryApiBackend },
        { provide: ARTICLE_REPOSITORY, useClass: HttpArticleRepository },
        { provide: COMMENT_REPOSITORY, useClass: HttpCommentRepository },
        { provide: FAVORITE_REPOSITORY, useClass: LocalFavoriteRepository }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});