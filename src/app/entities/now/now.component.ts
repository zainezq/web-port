import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, AfterViewChecked, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import mermaid from 'mermaid';
import { marked, Tokens, RendererObject } from 'marked';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import { ActivatedRoute, ActivationStart, Router } from '@angular/router';

@Component({
  selector: 'app-now',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './now.component.html',
  styleUrls: ['./now.component.scss'], 
  encapsulation: ViewEncapsulation.None
})
export class NowComponent implements OnInit, AfterViewChecked, AfterViewInit {
  markdownContent: string | Promise<string> = '';
  nowContent: SafeHtml = '';
  contentLoaded = false;
  
  @ViewChild('content', { static: false }) content?: ElementRef;
  
  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit(): void {
    const renderer = {
      code(this: any, args: Tokens.Code): string {
        const { text, lang } = args;
        if (lang === 'mermaid') {
          return `<div class="mermaid">${text}</div>`;
        }
        return `<pre><code class="language-${lang}">${text}</code></pre>`;
      }
    };
    marked.use({ renderer });
    mermaid.initialize({ startOnLoad: false });
    this.loadMarkdown();
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.scrollToAnchor(fragment);
      }
    });
  }
  
  ngAfterViewInit(): void {
    // Run mermaid after view is initialized
    setTimeout(() => {
      const mermaidDivs = document.querySelectorAll('.mermaid');
      if (mermaidDivs.length > 0) {
        mermaid.run({
          nodes: Array.from(mermaidDivs) as HTMLElement[]
        }).catch(err => console.error('Mermaid rendering error:', err));
      }
    }, 100);
  }
  
  ngAfterViewChecked(): void {
    this.handleAnchorClicks();
    
    // If content was just loaded, attempt to run mermaid
    if (this.contentLoaded) {
      setTimeout(() => {
        const mermaidDivs = document.querySelectorAll('.mermaid');
        if (mermaidDivs.length > 0) {
          mermaid.run({
            nodes: Array.from(mermaidDivs) as HTMLElement[]
          }).catch(err => console.error('Mermaid rendering error:', err));
        }
      }, 100);
      this.contentLoaded = false; // Reset flag after trying to render
    }
  }
  
  async loadMarkdown(): Promise<void> {
    try {
      const rawMd = await firstValueFrom(
        this.http.get('assets/now/now.md', { responseType: 'text' })
      );
      const html = marked(rawMd);
      if (typeof html === "string") {
        this.nowContent = this.sanitizer.bypassSecurityTrustHtml(html);
        this.contentLoaded = true; // Set flag when content is loaded
      }
    } catch (error) {
      console.error('Error loading now.md:', error);
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
