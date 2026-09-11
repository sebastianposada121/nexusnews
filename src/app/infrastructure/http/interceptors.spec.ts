import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { describe, expect, it } from 'vitest';
import { firstValueFrom, of, throwError } from 'rxjs';

import { cacheInterceptor } from './cache.interceptor';
import { errorInterceptor } from './error.interceptor';

const json = (status: number, body: unknown): HttpEvent<unknown> =>
  new HttpResponse({ status, body });

describe('cacheInterceptor', () => {
  it('sirve la segunda petición GET desde caché', async () => {
    let calls = 0;
    const handler: HttpHandlerFn = () => {
      calls += 1;
      return of(json(200, { seq: calls }));
    };

    await firstValueFrom(cacheInterceptor(new HttpRequest('POST', '/api/articles', null), handler));
    const first = (await firstValueFrom(
      cacheInterceptor(new HttpRequest('GET', '/api/articles'), handler)
    )) as HttpResponse<{ seq: number }>;
    const second = (await firstValueFrom(
      cacheInterceptor(new HttpRequest('GET', '/api/articles'), handler)
    )) as HttpResponse<{ seq: number }>;

    expect(first.body?.seq).toBe(2);
    expect(second.body).toEqual(first.body);
    expect(calls).toBe(2);
  });
});

describe('errorInterceptor', () => {
  it('reintenta una sola vez y reenvía el error normalizado', async () => {
    let attempts = 0;
    const handler: HttpHandlerFn = () => {
      attempts += 1;
      if (attempts === 1) {
        return throwError(
          () => new HttpErrorResponse({ status: 500, statusText: 'Server Error' })
        );
      }
      return of(json(200, { ok: true }));
    };

    const response = (await firstValueFrom(
      errorInterceptor(new HttpRequest('GET', '/api/articles'), handler)
    )) as HttpResponse<{ ok: boolean }>;

    expect(response.status).toBe(200);
    expect(attempts).toBe(2);
  });

  it('falla cuando el error persiste tras el reintento', async () => {
    const handler: HttpHandlerFn = () =>
      throwError(() => new HttpErrorResponse({ status: 0, statusText: 'Unknown Error' }));

    await expect(
      firstValueFrom(errorInterceptor(new HttpRequest('GET', '/api/articles'), handler))
    ).rejects.toMatchObject({ status: 0 });
  });
});