import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // ✅ Backend API URL

  constructor(private http: HttpClient) {}

  // ✅ Register method - Stores token upon successful signup
  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { name, email, password });
  }

  // ✅ Login method - Stores token upon successful login
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // ✅ Logout method - Clears the authentication token
  logout() {
    localStorage.removeItem('token');
  }

  // ✅ Save token after successful login
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  // ✅ Retrieve the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ✅ Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken(); // Returns true if a token exists
  }
}