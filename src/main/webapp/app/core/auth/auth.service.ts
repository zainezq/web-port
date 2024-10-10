import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {delay, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'jwtToken';

  constructor(private cookieService: CookieService) {}

  // Set the token in cookies
  setToken(token: string, rememberMe: boolean): void {
    const expiryDate = rememberMe ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : undefined; // 30 days for rememberMe
    this.cookieService.set(this.tokenKey, token, expiryDate);
  }

  // Get the token from cookies
  getToken(): string | null {
    console.log(this.cookieService.get(this.tokenKey));
    return this.cookieService.get(this.tokenKey) || null;

  }

  // Check if the user is logged in by verifying the presence of a valid JWT
  isAuthenticated(): boolean {
    const token = this.getToken();
    console.log(!!token && !this.isTokenExpired(token));
    return !!token && !this.isTokenExpired(token);
  }

  // Optional: Implement token expiration check
  private isTokenExpired(token: string): boolean {
    if (!token) return true;
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
  }

  // Call this method to log out
  clearToken(): void {
    this.cookieService.delete(this.tokenKey);
  }
  isAuthenticatedAsync(): Observable<boolean> {
    return of(true).pipe(delay(2000)); // Simulate a delay (replace with real logic)
  }
}
