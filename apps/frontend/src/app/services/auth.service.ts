// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { jwtDecode } from 'jwt-decode';
// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:3000/api/auth'; // ✅ Backend API URL

//   constructor(private http: HttpClient) {}

//   // ✅ Register method - Stores token upon successful signup
//   register(name: string, email: string, password: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/signup`, { name, email, password });
//   }

//   // ✅ Login method - Stores token upon successful login
//   login(email: string, password: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, { email, password });
//   }

//   // ✅ Logout method - Clears the authentication token
//   logout() {
//     localStorage.removeItem('token');
//   }

//   // ✅ Save token after successful login
//   saveToken(token: string) {
//     localStorage.setItem('token', token);
//   }

//   // ✅ Retrieve the token from localStorage
//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

// isAuthenticated(): boolean {
//   const token = this.getToken();

//   if (!token) {
//     return false;
//   }

//   try {
//     const decodedToken: any = jwtDecode(token);
//     const tokenExpiry = decodedToken.exp * 1000; // Convert to milliseconds

//     if (Date.now() > tokenExpiry) {
//       this.logout(); // Auto logout if expired
//       return false;
//     }

//     return true;
//   } catch (error) {
//     this.logout();
//     return false;
//   }
// }
// }

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
  private apiUrl = 'http://localhost:3000/api/auth'; // ✅ Backend API URL

  constructor(private http: HttpClient, private store: Store) {}

  // ✅ Register method
  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { name, email, password });
  }

  // ✅ Login method - Store token & user data
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string; user: User }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (response.token && response.user) {
          this.saveToken(response.token); // ✅ Store JWT token
          localStorage.setItem('user', JSON.stringify(response.user)); // ✅ Save full user object

          // ✅ Update NgRx Store
          this.store.dispatch(setUser({ user: response.user }));
        }
      })
    );
  }

  // ✅ Logout method - Clears everything
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.store.dispatch(clearUser()); // ✅ Clear NgRx Store
  }

  // ✅ Save JWT token
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  // ✅ Retrieve JWT token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ✅ Check authentication status & auto logout on token expiry
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