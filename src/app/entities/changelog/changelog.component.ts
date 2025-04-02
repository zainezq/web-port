import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { marked } from 'marked';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';


@Component({
  selector: 'app-changelog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChangelogComponent implements OnInit, AfterViewChecked {
  changelogContent: SafeHtml = '';

  @ViewChild('content', { static: false }) content?: ElementRef;


  constructor(private http: HttpClient, private router: Router,
              private route: ActivatedRoute,     private sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {

    this.loadMarkdown();

      this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.scrollToAnchor(fragment);
      }
    });
  }
  ngAfterViewInit(): void {

    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      this.scrollToAnchor(fragment);
    }
  }

  ngAfterViewChecked(): void {
    this.handleAnchorClicks();
  }



  async loadMarkdown(): Promise<void> {
    try {

      const rawMd = await firstValueFrom(this.http.get('assets/changelog/changelog.md', { responseType: 'text' }));
      const html = marked(rawMd);
      if (typeof html === "string") {
        this.changelogContent = this.sanitizer.bypassSecurityTrustHtml(html);
      }
    } catch (error) {
      console.error('Error loading changelog:', error);
    }
  }


  scrollToAnchor(anchor: string, attempts = 3): void {
    if (!anchor) return;

    let attemptCount = 0;
    const tryScroll = () => {
      const element = document.getElementById(anchor);
      if (element) {
        // Scroll to the anchor with a smooth behavior
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // After scrolling, check if the page height exceeds the viewport
        setTimeout(() => {
          if (document.body.scrollHeight > window.innerHeight) {
            document.body.style.overflowY = 'auto';  // Re-enable scrolling
          }
        }, 100);
      } else if (attemptCount < attempts) {
        attemptCount++;
        setTimeout(tryScroll, 100);
      }
    };

    tryScroll();
  }


  handleAnchorClicks(): void {
    if (!this.content) return;

    const links = this.content.nativeElement.querySelectorAll('a[href^="#"]');
    links.forEach((link: HTMLAnchorElement) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();

        const targetId = link.getAttribute('href')?.substring(1);
        if (targetId) {
          // Temporarily hide overflow to prevent page shift when scrolling
          document.body.style.overflowY = 'hidden';

          this.router.navigate([], {
            fragment: targetId,
            queryParamsHandling: 'preserve',
            replaceUrl: true
          }).then(() => {
            this.scrollToAnchor(targetId);
          });

          // Allow overflow after scroll
          setTimeout(() => {
            document.body.style.overflowY = 'auto';
          }, 500);
        }
      });
    });
  }



}
