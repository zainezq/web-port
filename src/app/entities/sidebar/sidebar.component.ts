import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationStart, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  showSidebar = true;  // Default to false for small screens
  isLargeScreen = window.innerWidth >= 768;
  private resizeListener: any;

  constructor(private router: Router) {}

  ngOnInit() {
    if (this.isLargeScreen) {
      this.showSidebar = true;  // Keep sidebar visible on large screens
    }
    if (!this.isLargeScreen) {
      //this.showSidebar = false;  // Hide sidebar on small screens
      console.log('Hide sidebar');
    }

    // Listen for route changes and hide the sidebar on small screens
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (!this.isLargeScreen) {
          this.showSidebar = false;  // Hide sidebar on small screens when navigating
        }
      }
    });

    // Listen for window resizing to dynamically adjust sidebar visibility
    this.resizeListener = () => {
      this.isLargeScreen = window.innerWidth >= 1024;
      if (this.isLargeScreen) {
        this.showSidebar = true;  // Keep sidebar visible on large screens
      }
    };
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy() {
    // Cleanup the resize event listener when the component is destroyed
    window.removeEventListener('resize', this.resizeListener);
  }

  toggleSidebar() {
    if (!this.isLargeScreen) {
      console.log('Toggle sidebar');
      this.showSidebar = !this.showSidebar;
      console.log('Sidebar visible:', this.showSidebar);  // Log the state for debugging
    } else {
      this.showSidebar = true;  // Ensure sidebar stays visible on larger screens
    }
  }
}
