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

    initializeApp(environment.firebase);
  }
}
