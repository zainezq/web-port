import {Component, NgModule, OnInit} from '@angular/core';
import {NavigationStart, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {SidebarComponent} from './entities/sidebar/sidebar.component';
import {NgIf} from '@angular/common';
import {LoadingComponent} from './entities/shared/loading/loading.component';


@Component({
  selector: 'app-root',
  //imports: [RouterOutlet, RouterLink, RouterLinkActive, SidebarComponent],
  imports: [RouterOutlet, SidebarComponent, NgIf, LoadingComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  title = 'web-port-frontend';
  loading = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 300); // Delay of 1 second
      }
    });
  }
}
