import { Component } from '@angular/core';
import { NavigationStart, NavigationEnd, Router, Event, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { SidebarComponent } from './entities/sidebar/sidebar.component';
import { LoadingComponent } from './entities/shared/loading/loading.component';

import { initializeApp } from 'firebase/app';
import { environment} from '../environments/environment.development';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, NgIf, LoadingComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  title = 'zainezq';
  loading = false;
  showSidebar = true;

  constructor(private router: Router) {
    // Initialize Firebase
    initializeApp(environment.firebase);

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Optional: prevent re-triggering on anchor navigation
        if (!event.url.includes('#')) {
          this.loading = true;
        }
      }

      if (event instanceof NavigationEnd) {
        const hiddenSidebarRoutes = ['/404', '/error'];

        // Use the final redirected URL to avoid flicker
        const finalUrl = event.urlAfterRedirects || event.url;

        this.showSidebar = !hiddenSidebarRoutes.includes(finalUrl);
        this.loading = false;
      }
    });
  }
}

