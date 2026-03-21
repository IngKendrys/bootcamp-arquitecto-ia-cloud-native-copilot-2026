import { Injectable, signal } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OidcAuthService {
  readonly initializing = signal(false);
  readonly authError = signal<string | null>(null);
  readonly accessToken = signal<string | null>(null);
  readonly username = signal<string | null>(null);

  constructor(private readonly oauthService: OAuthService) {
    const config: AuthConfig = {
      issuer: environment.oidc.issuer,
      clientId: environment.oidc.clientId,
      responseType: 'code',
      scope: environment.oidc.scope,
      redirectUri: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      requireHttps: environment.oidc.requireHttps,
      strictDiscoveryDocumentValidation: false,
      showDebugInformation: true,
      clearHashAfterLogin: true,
    };

    this.oauthService.configure(config);
  }

  async initializeSession(): Promise<void> {
    this.initializing.set(true);
    this.authError.set(null);

    try {
      await this.oauthService.loadDiscoveryDocumentAndTryLogin();
      this.refreshSignals();
    } catch (error) {
      this.authError.set('No se pudo inicializar la sesión OIDC. Verifica issuer y cliente.');
      this.accessToken.set(null);
      this.username.set(null);
      console.error(error);
    } finally {
      this.initializing.set(false);
    }
  }

  login(): void {
    this.oauthService.initCodeFlow();
  }

  logout(): void {
    this.oauthService.logOut();
    this.accessToken.set(null);
    this.username.set(null);
  }

  isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  private refreshSignals(): void {
    const token = this.oauthService.getAccessToken();
    this.accessToken.set(token || null);

    const claims = this.oauthService.getIdentityClaims() as Record<string, unknown> | null;
    const username =
      (claims?.['preferred_username'] as string | undefined) ||
      (claims?.['name'] as string | undefined) ||
      (claims?.['email'] as string | undefined) ||
      null;

    this.username.set(username);
  }
}
