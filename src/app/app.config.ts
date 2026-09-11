import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, HttpBackend } from '@angular/common/http';

import { routes } from './app.routes';
import { ARTICLE_REPOSITORY } from './core/domain/repositories/article.repository';
import { COMMENT_REPOSITORY } from './core/domain/repositories/comment.repository';
import { FAVORITE_REPOSITORY } from './core/domain/repositories/favorite.repository';
import { TESTIMONIAL_REPOSITORY } from './core/domain/repositories/testimonial.repository';
import { HttpArticleRepository } from './data/repositories/http-article.repository';
import { HttpCommentRepository } from './data/repositories/http-comment.repository';
import { HttpTestimonialRepository } from './data/repositories/http-testimonial.repository';
import { LocalFavoriteRepository } from './data/repositories/local-favorite.repository';
import { InMemoryApiBackend } from './data/mock/in-memory-api.backend';
import { cacheInterceptor } from './infrastructure/http/cache.interceptor';
import { errorInterceptor } from './infrastructure/http/error.interceptor';
import { loggingInterceptor } from './infrastructure/http/logging.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([loggingInterceptor, cacheInterceptor, errorInterceptor])),
    { provide: HttpBackend, useClass: InMemoryApiBackend },
    { provide: ARTICLE_REPOSITORY, useClass: HttpArticleRepository },
    { provide: COMMENT_REPOSITORY, useClass: HttpCommentRepository },
    { provide: FAVORITE_REPOSITORY, useClass: LocalFavoriteRepository },
    { provide: TESTIMONIAL_REPOSITORY, useClass: HttpTestimonialRepository }
  ]
};