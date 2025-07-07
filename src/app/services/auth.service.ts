import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private jwtToken = '';
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
    this.jwtToken = localStorage.getItem('token') || '';
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${this.apiUrl}/auth/login`, { username, password })
      .pipe(
        tap((res) => {
          this.jwtToken = res.token;
          localStorage.setItem('token', res.token);
        })
      );
  }

  register(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/register`, {
      username,
      password,
    });
  }

  get token() {
    return this.jwtToken;
  }

  isLoggedIn() {
    return !!this.jwtToken;
  }

  logout() {
    this.jwtToken = '';
    localStorage.removeItem('token');
  }
}
