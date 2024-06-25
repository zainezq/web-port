import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { DashboardComponent } from './loggedIn/dashboard.component';
import { NgIf } from '@angular/common';
import {routes} from "../app.routes";
import {Router, RouterLink} from "@angular/router";
import {LoadingSpinnerComponent} from "../core/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    DashboardComponent,
    NgIf,
    RouterLink,
    LoadingSpinnerComponent
  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    console.log(this.authService.isAuthenticated());
    if (this.authService.isAuthenticated()) {
      this.isLoggedIn = true;
      this.router.navigate(['/dashboard']);
    }
  }
}
