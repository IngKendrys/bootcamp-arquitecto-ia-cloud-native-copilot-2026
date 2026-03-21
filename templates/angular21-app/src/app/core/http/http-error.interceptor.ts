import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ApiError } from './api-error.model';

function normalizeHttpError(error: HttpErrorResponse): ApiError {
  const backendMessage =
    typeof error.error === 'string'
      ? error.error
      : (error.error?.message as string | undefined) || '';

  return {
    status: error.status || 0,
    code: error.status ? `HTTP_${error.status}` : 'HTTP_NETWORK_ERROR',
    message: backendMessage || 'Ocurrió un error inesperado al comunicar con la API.',
    details: error.url ?? undefined,
  };
}

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      return throwError(() => normalizeHttpError(error));
    }),
  );
};
