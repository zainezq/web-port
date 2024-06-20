import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedInStatus = false;
  constructor() {}

  getToken() {
    return localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
  }

  login() {
    this.isLoggedInStatus = true; //once a user logs in the status is true
  }
  setLoginStatus(status: boolean) {
    status = this.isLoggedInStatus;
  }
  isLoggedIn(): boolean {
    return this.getToken() !== null;
    //if the token is not null,
    // it means the user is logged in, and the function returns true,
    // otherwise it returns false.
  }

  logout() {
    localStorage.removeItem('jwtToken');
    sessionStorage.removeItem('jwtToken');
    this.isLoggedInStatus = false;
  }

}
