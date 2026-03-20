import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { OidcAuthService } from '../services/oidc-auth.service';
import { environment } from '../../../environments/environment';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const oidcAuth = inject(OidcAuthService);
  const token = oidcAuth.accessToken();

  const isApiRequest = req.url.startsWith(environment.apiBaseUrl);
  if (!token || !isApiRequest) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};
