import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersStore } from './users.store';

@Component({
  selector: 'app-users-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-dashboard.component.html',
  styleUrl: './users-dashboard.component.css',
})
export class UsersDashboardComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly store = inject(UsersStore);

  readonly createForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async ngOnInit(): Promise<void> {
    await this.store.initializeSession();
  }

  loginWithOidc(): void {
    this.store.loginWithOidc();
  }

  logout(): void {
    this.store.logout();
  }

  submitCreate(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    this.store.createUser(this.createForm.getRawValue());
    this.createForm.reset();
  }
}
