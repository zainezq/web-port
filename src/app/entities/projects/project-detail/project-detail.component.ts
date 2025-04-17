import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectServiceService } from '../../../services/project-service/project-service.service';
import { marked, options, Tokens } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import mermaid from 'mermaid';
import markedKatex from 'marked-katex-extension';
import markedFootnote from 'marked-footnote';
import katex from 'katex';

marked.use(gfmHeadingId());

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  standalone: true,
  styleUrl: './project-detail.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProjectDetailComponent implements OnInit, AfterViewChecked, AfterViewInit {
  projectContent: SafeHtml = '';
  projectTitle: string = '';

  @ViewChild('content', { static: false }) content?: ElementRef;
  private loading: boolean | undefined;

  constructor(
    private projectService: ProjectServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    const options = {
      throwOnError: false
    };

    // Define custom renderer for Mermaid and other code blocks
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

    // Subscribe to the route parameters to load project content
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.loading = true;

        this.projectService.getProjectContent(slug).subscribe({
          next: (data) => {
	    marked.use(markedKatex(options));
	    marked.use(markedFootnote());

            const html = marked(data); // Use marked to parse the content with the custom renderer
            if (typeof html === 'string') {
              this.projectContent = this.sanitizer.bypassSecurityTrustHtml(html);
            }

            this.loading = false;
            setTimeout(() => {
              Prism.highlightAll(); // Highlight code blocks with Prism
              mermaid.init(undefined, document.querySelectorAll('.mermaid')); // Initialize Mermaid diagrams
            }, 0);
          },
          error: (err) => {
            console.error('Error fetching project content:', err);
            this.loading = false;
          },
        });
      }
    });

    // Scroll to anchor if a fragment is present in the URL
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
