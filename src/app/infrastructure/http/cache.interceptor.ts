import { HttpEventType, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';

const TTL_MS = 30_000;

interface CacheEntry {
  response: HttpResponse<unknown>;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry>();

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET') {
    cache.clear();
    return next(req);
  }

  const key = req.urlWithParams;
  const cached = cache.get(key);
  if (cached && cached.expiresAt > Date.now()) {
    return of(cached.response.clone());
  }

  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        cache.set(key, {
          response: event.clone(),
          expiresAt: Date.now() + TTL_MS
        });
      }
    })
  );
};