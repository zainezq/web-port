import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost, BlogService } from '../../services/blog-service/blog.service';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript'; // Add specific language support if needed
import 'prismjs/components/prism-typescript'; // For TypeScript highlighting
import 'prismjs/components/prism-css';       // For CSS highlighting
import 'prismjs/components/prism-markup';    // For HTML/markup

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  standalone: true,
  imports: [
    NgIf
  ],
  styleUrls: ['./blog-detail.component.scss'],
  encapsulation: ViewEncapsulation.None  // Disable encapsulation
})
export class BlogDetailComponent implements OnInit, AfterViewChecked {
  blogContent: SafeHtml = '';
  blogTitle: string = '';

  @ViewChild('content', { static: false }) content?: ElementRef;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
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


  }
  ngAfterViewChecked(): void {
    this.addCopyButtons();
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
