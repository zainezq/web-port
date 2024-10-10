import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/auth/auth.service";
import { DashboardService } from "./service/dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private AuthService: AuthService, private dashService: DashboardService) {

  }

  ngOnInit(): void {

  }
  testing() {
    console.log("test");
  }

  logout() {
    this.AuthService.clearToken();
    window.location.reload();
  }
}
