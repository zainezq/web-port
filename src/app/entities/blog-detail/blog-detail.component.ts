import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { BlogService } from '../../services/blog-service/blog.service';
import {marked, Tokens} from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import katex from 'katex';
import '/assets/katex/katex.min.css';
import markedKatex from "marked-katex-extension";
import markedFootnote from 'marked-footnote';

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
    const options = {
      throwOnError: false
    };

    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.blogService.getBlogContent(slug).subscribe({
        next: (data) => {
          marked.use(markedKatex(options));
          marked.use(markedFootnote());

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
    this.renderMath();
  }

  renderMath(): void {
    if (this.content) {
      const elements = this.content.nativeElement.querySelectorAll('span.math, div.math');
      elements.forEach((element: HTMLElement) => {
        const math = element.textContent || '';
        try {
          katex.render(math, element, {
            throwOnError: false,
            displayMode: element.tagName === 'DIV',
          });

          // Ensure proper styling
          element.classList.add('math-rendered');
        } catch (error) {
          console.error('KaTeX rendering error: ', error);
        }
      });
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
