import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { marked } from 'marked';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-sitemap',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class SitemapComponent implements OnInit, AfterViewChecked {
  sitemapContent: SafeHtml = '';

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

  ngAfterViewChecked(): void {
    this.handleAnchorClicks();
  }



  async loadMarkdown(): Promise<void> {
    try {

      const rawMd = await firstValueFrom(this.http.get('assets/sitemap/sitemap.md', { responseType: 'text' }));
      const html = marked(rawMd);
      if (typeof html === "string") {
        this.sitemapContent = this.sanitizer.bypassSecurityTrustHtml(html);
      }
    } catch (error) {
      console.error('Error loading sitemap:', error);
    }
  }


  scrollToAnchor(anchor: string, attempts = 3): void {
    if (!anchor) return;

    let attemptCount = 0;
    const tryScroll = () => {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          if (document.body.scrollHeight > window.innerHeight) {
            document.body.style.overflowY = 'auto';
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
          document.body.style.overflowY = 'hidden';
          this.router.navigate([], {
            fragment: targetId,
            queryParamsHandling: 'preserve',
            replaceUrl: true
          }).then(() => {
            this.scrollToAnchor(targetId);
          });
          setTimeout(() => {
            document.body.style.overflowY = 'auto';
          }, 500);
        }
      });
    });
  }
}
