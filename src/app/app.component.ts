import { Component } from '@angular/core';
import {NavigationStart, NavigationEnd, Router, Event, RouterOutlet} from '@angular/router';
import { NgIf } from '@angular/common';
import { SidebarComponent } from './entities/sidebar/sidebar.component';
import { LoadingComponent } from './entities/shared/loading/loading.component';

@Component({
  selector: 'app-root',
  imports: [SidebarComponent, NgIf, LoadingComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  title = 'web-port-frontend';
  loading = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (!event.url.includes('#')) {
          this.loading = true;
        }
      }
      if (event instanceof NavigationEnd) {
        this.loading = false;
      }
    });
  }
}
