import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit
} from '@angular/core';
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

    // Listen for fragment changes and scroll accordingly
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.scrollToAnchor(fragment);
      }
    });
  }

  ngAfterViewInit(): void {
    // Handle scrolling on initial page load if a fragment exists
    setTimeout(() => {
      if (this.route.snapshot.fragment) {
        this.scrollToAnchor(this.route.snapshot.fragment);
      }
    }, 500);
  }

  ngAfterViewChecked(): void {
    this.addCopyButtons();
    this.handleAnchorClicks(); // Attach event listeners to ToC links
  }

  /**
   * Smoothly scroll to the element with the given anchor (from URL fragment)
   */
  scrollToAnchor(anchor: string): void {
    if (!anchor) return;

    setTimeout(() => {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // If element isn't found yet, observe and scroll when available
        this.observeContentChange(anchor);
      }
    }, 300);
  }

  /**
   * Detect changes in dynamically loaded content and scroll when the element appears
   */
  observeContentChange(anchor: string): void {
    const observer = new MutationObserver((mutations, obs) => {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        obs.disconnect(); // Stop observing once element is found
      }
    });

    observer.observe(this.content?.nativeElement, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Attach event listeners to prevent default ToC link behavior and ensure smooth scrolling
   */
  handleAnchorClicks(): void {
    setTimeout(() => {
      const links = this.content?.nativeElement.querySelectorAll('a[href^="#"]');
      links?.forEach((link: HTMLAnchorElement) => {
        link.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default jump & page reload

          const targetId = link.getAttribute('href')?.substring(1);
          if (targetId) {
            this.router.navigate([], { fragment: targetId, queryParamsHandling: 'preserve' }); // Update URL without refresh
            this.scrollToAnchor(targetId);
          }
        });
      });
    }, 500);
  }

  /**
   * Add "Copy" button to code blocks
   */
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
