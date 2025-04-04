import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectServiceService } from '../../../services/project-service/project-service.service';
import { marked, Tokens } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import mermaid from 'mermaid';

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
      if (!block.querySelector('.copy-btn')) {
        const copyBtn = document.createElement('button');
        copyBtn.classList.add('copy-btn');
        copyBtn.textContent = 'Copy';
        block.appendChild(copyBtn);

        copyBtn.addEventListener('click', () => {
          const code = block.querySelector('code')?.textContent;
          if (code) {
            navigator.clipboard.writeText(code).then(() => {
              copyBtn.textContent = 'Copied!';
              setTimeout(() => (copyBtn.textContent = 'Copy'), 1000);
            }).catch(err => console.error('Failed to copy:', err));
          }
        });
      }
    });
  }
}
