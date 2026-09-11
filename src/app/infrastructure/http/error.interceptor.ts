import { HttpErrorResponse, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET') {
    return next(req);
  }

  let attempts = 0;
  const retryOnce = (): Observable<HttpEvent<unknown>> =>
    next(req).pipe(
      catchError((error) => {
        if (attempts < 1) {
          attempts += 1;
          return retryOnce();
        }
        const normalized = error instanceof HttpErrorResponse ? error : new HttpErrorResponse({
          status: 0,
          error,
          statusText: 'Network Error'
        });
        const message =
          (normalized.error as { message?: string } | null)?.message ??
          (normalized.statusText || 'Ocurrió un error inesperado');
        console.error(`[HTTP] Error en ${req.urlWithParams}: ${message}`);
        return throwError(() => normalized);
      })
    );

  return retryOnce();
};