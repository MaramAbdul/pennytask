import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { setUser, clearUser } from '../store/user.actions';
import { jwtDecode } from 'jwt-decode';
import { User } from '../store/user.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private store: Store) {}

  // Register
  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { name, email, password });
  }

  // Login
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string; user: User }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (response.token && response.user) {
          this.saveToken(response.token);
          localStorage.setItem('user', JSON.stringify(response.user)); 

          this.store.dispatch(setUser({ user: response.user }));
        }
      })
    );
  }

  //  Logout 
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.store.dispatch(clearUser());
  }

  // Save token
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  //  Retrieve JWT token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // check authentication status & auto logout on token expiry
  isAuthenticated(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const tokenExpiry = decodedToken.exp * 1000; // Convert to milliseconds

      if (Date.now() > tokenExpiry) {
        this.logout(); // Auto logout if expired
        return false;
      }

      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }
}