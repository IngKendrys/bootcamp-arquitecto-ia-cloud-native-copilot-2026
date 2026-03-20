import { computed, inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ApiError } from '../../core/http/api-error.model';
import { AuthApiService } from '../../core/services/auth-api.service';
import { UsersApiService } from '../../core/services/users-api.service';
import { LoginRequest, RegisterUserRequest, User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UsersStore {
  private readonly authApi = inject(AuthApiService);
  private readonly usersApi = inject(UsersApiService);

  readonly token = signal<string | null>(null);
  readonly users = signal<User[]>([]);
  readonly loading = signal(false);
  readonly authenticating = signal(false);
  readonly creating = signal(false);

  readonly authError = signal<string | null>(null);
  readonly usersError = signal<string | null>(null);
  readonly formMessage = signal<string>('Completa el formulario para crear un usuario.');

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

  login(payload: LoginRequest): void {
    this.authError.set(null);
    this.authenticating.set(true);

    this.authApi
      .login(payload)
      .pipe(finalize(() => this.authenticating.set(false)))
      .subscribe({
        next: (response) => {
          const token = response.token || response.access_token;
          if (!token) {
            this.authError.set('La API no devolvió token de autenticación.');
            return;
          }

          this.token.set(token);
          this.formMessage.set('Autenticación exitosa. Ya puedes listar y crear usuarios.');
          this.fetchUsers();
        },
        error: (error: ApiError) => {
          this.authError.set(error.message);
        },
      });
  }

  fetchUsers(): void {
    const token = this.token();
    if (!token) {
      this.usersError.set('Inicia sesión para listar usuarios.');
      return;
    }

    this.usersError.set(null);
    this.loading.set(true);

    this.usersApi
      .listUsers(token)
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
