import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'jwtToken';

  constructor() {}

  getToken() {
    return localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
  }
  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    sessionStorage.setItem(this.tokenKey, token);
  }



  setLoginStatus(status: boolean) {
    status = this.isLoggedInStatus;
  }
  // Check if the user is logged in by verifying the presence of a valid JWT


  get isLoggedInStatus(): boolean {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const token = localStorage.getItem(this.tokenKey);
      return !!token && !this.isTokenExpired(token);
    }
    return false; // or some default value
  }

  // Optional: Implement token expiration check
  private isTokenExpired(token: string): boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  // Call this method to log out
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

}
