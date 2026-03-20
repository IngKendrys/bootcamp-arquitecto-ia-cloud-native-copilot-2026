import { computed, inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ApiError } from '../../core/http/api-error.model';
import { OidcAuthService } from '../../core/services/oidc-auth.service';
import { UsersApiService } from '../../core/services/users-api.service';
import { RegisterUserRequest, User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UsersStore {
  private readonly oidcAuth = inject(OidcAuthService);
  private readonly usersApi = inject(UsersApiService);

  readonly users = signal<User[]>([]);
  readonly loading = signal(false);
  readonly creating = signal(false);

  readonly authError = signal<string | null>(null);
  readonly usersError = signal<string | null>(null);
  readonly formMessage = signal<string>('Inicia sesión con OIDC para gestionar usuarios.');

  readonly page = signal(1);
  readonly pageSize = signal(5);

  readonly totalUsers = computed(() => this.users().length);
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.totalUsers() / this.pageSize())));
  readonly pagedUsers = computed(() => {
    const from = (this.page() - 1) * this.pageSize();
    return this.users().slice(from, from + this.pageSize());
  });

  readonly canPrevPage = computed(() => this.page() > 1);
  readonly canNextPage = computed(() => this.page() < this.totalPages());

  readonly authenticating = computed(() => this.oidcAuth.initializing());
  readonly isAuthenticated = computed(() => this.oidcAuth.isAuthenticated());
  readonly username = computed(() => this.oidcAuth.username());

  async initializeSession(): Promise<void> {
    await this.oidcAuth.initializeSession();
    this.authError.set(this.oidcAuth.authError());

    if (this.isAuthenticated()) {
      this.formMessage.set('Sesión OIDC activa. Ya puedes listar y crear usuarios.');
      this.fetchUsers();
    }
  }

  loginWithOidc(): void {
    this.authError.set(null);
    this.oidcAuth.login();
  }

  logout(): void {
    this.oidcAuth.logout();
    this.users.set([]);
    this.usersError.set(null);
    this.formMessage.set('Sesión cerrada. Inicia sesión para continuar.');
  }

  fetchUsers(): void {
    if (!this.isAuthenticated()) {
      this.usersError.set('Inicia sesión para listar usuarios.');
      return;
    }

    this.usersError.set(null);
    this.loading.set(true);

    this.usersApi
      .listUsers()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (users) => {
          this.users.set(users);
          this.page.set(1);
        },
        error: (error: ApiError) => {
          this.usersError.set(error.message);
          this.users.set([]);
        },
      });
  }

  createUser(payload: RegisterUserRequest): void {
    if (!this.isAuthenticated()) {
      this.formMessage.set('Debes iniciar sesión para crear usuarios.');
      return;
    }

    this.creating.set(true);
    this.formMessage.set('Creando usuario...');

    this.usersApi
      .registerUser(payload)
      .pipe(finalize(() => this.creating.set(false)))
      .subscribe({
        next: (user) => {
          this.formMessage.set(`Usuario creado: ${user.username}`);
          this.fetchUsers();
        },
        error: (error: ApiError) => {
          const duplicateUser = error.status === 400 && /usuario existe/i.test(error.message);
          if (duplicateUser) {
            this.formMessage.set('No se pudo crear: el username ya existe. Usa uno diferente.');
            return;
          }

          if (error.status === 403) {
            this.formMessage.set('No autorizado por rol para crear usuarios (403).');
            return;
          }

          this.formMessage.set(`No se pudo crear usuario: ${error.message}`);
        },
      });
  }

  prevPage(): void {
    if (this.canPrevPage()) {
      this.page.set(this.page() - 1);
    }
  }

  nextPage(): void {
    if (this.canNextPage()) {
      this.page.set(this.page() + 1);
    }
  }
}
