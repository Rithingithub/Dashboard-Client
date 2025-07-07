import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [CommonModule, FormsModule, RouterModule],
})
export class RegisterComponent {
  f = { username: '', password: '' };
  message = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    this.auth.register(this.f.username, this.f.password).subscribe({
      next: () => {
        this.message = 'Registration successful. You can log in now.';
        this.router.navigate(['/login']);
      },
      error: () => (this.error = 'Username already exists.'),
    });
  }
}
