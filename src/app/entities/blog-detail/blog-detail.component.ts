import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { BlogService } from '../../services/blog-service/blog.service';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  standalone: true,
  imports: [

  ],
  styleUrls: ['./blog-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogDetailComponent implements OnInit, AfterViewChecked {
  blogContent: SafeHtml = '';
  blogTitle: string = '';

  @ViewChild('content', { static: false }) content?: ElementRef;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.blogService.getBlogContent(slug).subscribe({
        next: (data) => {
          const html = marked(data);
          if (typeof html === "string") {
            this.blogContent = this.sanitizer.bypassSecurityTrustHtml(html);
          }

          // Highlight code after rendering
          setTimeout(() => Prism.highlightAll(), 0);
        },
        error: (err) => console.error('Error fetching blog content:', err),
      });

      // Optionally fetch blog metadata (e.g., title)
      this.blogService.getBlogList().subscribe({
        next: (data) => {
          const blog = data.find((b) => b.slug === slug);
          if (blog) this.blogTitle = blog.title;
        },
      });
    }

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
    this.addCopyButtons();
  }

  /**
   * Scroll smoothly to the element with the given anchor (from URL fragment)
   */
  scrollToAnchor(anchor: string, attempts = 3): void {
    if (!anchor) return;

    let attemptCount = 0;
    const tryScroll = () => {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (attemptCount < attempts) {
        attemptCount++;
        setTimeout(tryScroll, 100);
      }
    };

    tryScroll();
  }


  /**
   * Add smooth scrolling for ToC links inside the dynamically rendered Markdown
   */
  handleAnchorClicks(): void {
    if (!this.content) return;

    const links = this.content.nativeElement.querySelectorAll('a[href^="#"]');
    links.forEach((link: HTMLAnchorElement) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();

        const targetId = link.getAttribute('href')?.substring(1);
        if (targetId) {

          this.router.navigate([], {
            fragment: targetId,
            queryParamsHandling: 'preserve',
            replaceUrl: true
          }).then(() => {
            this.scrollToAnchor(targetId);
          });
        }
      });
    });
  }



  addCopyButtons(): void {
    const codeBlocks = this.content?.nativeElement.querySelectorAll('pre');
    codeBlocks.forEach((block: HTMLElement) => {
      if (!block.querySelector('.copy-btn')) { // Prevent adding multiple buttons
        const copyBtn = document.createElement('button');
        copyBtn.classList.add('copy-btn');
        copyBtn.textContent = 'Copy';
        block.appendChild(copyBtn);

        copyBtn.addEventListener('click', () => {
          const code = block.querySelector('code')?.textContent;
          if (code) {
            navigator.clipboard.writeText(code).then(() => {
              // Change the button text to "Copied!" and reset it
              copyBtn.textContent = 'Copied!';
              setTimeout(() => {
                copyBtn.textContent = 'Copy'; // Reset text after 1 second
              }, 1000);
            }).catch(err => {
              console.error('Failed to copy: ', err);
            });
          }
        });
      }
    });
  }
}
