import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, RouterModule, FormsModule],
})
export class LoginComponent {
  f = { username: '', password: '' };
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login(this.f.username, this.f.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => (this.error = 'Invalid credentials or too many attempts'),
    });
  }
}
