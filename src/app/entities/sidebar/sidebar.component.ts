import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationStart, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {DatePipe, NgClass, NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
    NgClass,
    DatePipe,
    NgIf
  ],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  showSidebar = true;  // Default to false for small screens
  isLargeScreen = window.innerWidth >= 768;
  private resizeListener: any;
  lastUpdated: Date = new Date('2025-04-06T22:06:54.481Z');

  constructor(private router: Router) {}

  ngOnInit() {
    if (this.isLargeScreen) {
      this.showSidebar = true;
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (!this.isLargeScreen) {
          this.showSidebar = false;
        }
      }
    });

    this.resizeListener = () => {
      this.isLargeScreen = window.innerWidth >= 1024;
      if (this.isLargeScreen) {
        this.showSidebar = true;
      }
    };
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener);
  }

  toggleSidebar() {
    if (!this.isLargeScreen) {
      this.showSidebar = !this.showSidebar;
    } else {
      this.showSidebar = true;
    }
  }
}
