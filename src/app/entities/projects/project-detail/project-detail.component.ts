import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectServiceService } from '../../../services/project-service/project-service.service';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';

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

  constructor(
    private projectService: ProjectServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.projectService.getProjectContent(slug).subscribe({
        next: (data) => {
          const html = marked(data);
          if (typeof html === 'string') {
            this.projectContent = this.sanitizer.bypassSecurityTrustHtml(html);
          }

          // Highlight code after rendering
          setTimeout(() => Prism.highlightAll(), 0);
        },
        error: (err) => console.error('Error fetching project content:', err),
      });

      this.projectService.getProjectList().subscribe({
        next: (data) => {
          const project = data.find((b) => b.slug === slug);
          if (project) this.projectTitle = project.title;
        },
      });
    }

    // Listen for fragment changes (when clicking on a ToC link)
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.scrollToAnchor(fragment);
      }
    });
  }

  ngAfterViewInit(): void {
    // Scroll to anchor if there’s already a hash in the URL when the page loads
    setTimeout(() => {
      if (this.route.snapshot.fragment) {
        this.scrollToAnchor(this.route.snapshot.fragment);
      }
    }, 300);
  }

  ngAfterViewChecked(): void {
    this.addCopyButtons();
    this.handleAnchorClicks();
  }

  /**
   * Scroll smoothly to the element with the given anchor (from URL fragment)
   */
  scrollToAnchor(anchor: string): void {
    setTimeout(() => {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  }

  /**
   * Add smooth scrolling for ToC links inside the dynamically rendered Markdown
   */
  handleAnchorClicks(): void {
    setTimeout(() => {
      const links = this.content?.nativeElement.querySelectorAll('a[href^="#"]');
      links?.forEach((link: HTMLAnchorElement) => {
        link.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default behavior (refresh)
          const targetId = link.getAttribute('href')?.substring(1);
          if (targetId) {
            this.router.navigate([], { fragment: targetId, queryParamsHandling: 'preserve' }); // Update URL without reload
            this.scrollToAnchor(targetId);
          }
        });
      });
    }, 300);
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
