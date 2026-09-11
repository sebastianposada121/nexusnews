import { HttpErrorResponse, HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const started = performance.now();

  return next(req).pipe(
    tap({
      next(event) {
        if (event.type === HttpEventType.Response) {
          const elapsed = (performance.now() - started).toFixed(1);
          console.log(`[HTTP] ${req.method} ${req.urlWithParams} -> ${event.status} (${elapsed} ms)`);
        }
      },
      error(error) {
        const elapsed = (performance.now() - started).toFixed(1);
        const status = error instanceof HttpErrorResponse ? error.status : 'ERR';
        console.error(`[HTTP] ${req.method} ${req.urlWithParams} -> ${status} (${elapsed} ms)`, error);
      }
    })
  );
};