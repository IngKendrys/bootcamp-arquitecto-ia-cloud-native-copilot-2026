import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RegisterUserRequest, User } from '../../features/users/user.model';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = environment.apiBaseUrl;

  listUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiBaseUrl}/api/users`);
  }

  registerUser(payload: RegisterUserRequest): Observable<User> {
    return this.http.post<User>(`${this.apiBaseUrl}/api/auth/register`, payload);
  }
}
