import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { DashboardComponent } from './loggedIn/dashboard.component';
import { NgIf } from '@angular/common';
import {routes} from "../app.routes";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    DashboardComponent,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedInStatus;
    console.log(this.authService.isLoggedInStatus);
    if (this.authService.isLoggedInStatus) {
      this.isLoggedIn = true;
      this.router.navigate(['/dashboard']);
    }
  }
}
