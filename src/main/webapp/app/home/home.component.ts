import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {DashboardComponent} from "./loggedIn/dashboard.component";
import { HomepageComponent } from "./notLoggedIn/homepage.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    DashboardComponent,
    HomepageComponent,
    NgIf
  ],
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {

  }
}
