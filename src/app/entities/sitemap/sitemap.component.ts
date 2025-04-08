import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { marked } from 'marked';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface BlogMetadata {
  id: number;
  title: string;
  slug: string;
  summary: string;
  date: string;
  readingTime: string;
  tags: string[];
}

interface ProjectMetadata {
  id: number;
  title: string;
  slug: string;
  summary?: string;
  date?: string;
  tags?: string[];
}

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
  blogMetadata: BlogMetadata[] = [];
  projectMetadata: ProjectMetadata[] = [];
  
  @ViewChild('content', { static: false }) content?: ElementRef;
  
  constructor(
    private http: HttpClient, 
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    Promise.all([
      this.loadBlogMetadata(),
      this.loadProjectMetadata()
    ]).then(() => {
      this.generateSitemap();
    });
    
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.scrollToAnchor(fragment);
      }
    });
  }

  ngAfterViewChecked(): void {
    this.handleAnchorClicks();
  }

  async loadBlogMetadata(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.get<BlogMetadata[]>('assets/blogs/index.json')
      );
      this.blogMetadata = response;
    } catch (error) {
      console.error('Error loading blog metadata:', error);
    }
  }

  async loadProjectMetadata(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.get<ProjectMetadata[]>('assets/projects/index.json')
      );
      this.projectMetadata = response;
    } catch (error) {
      console.error('Error loading project metadata:', error);
    }
  }

  generateSitemap(): void {
    // Create the base sitemap structure
    let sitemapMd = `# Sitemap\n\n`;
    sitemapMd += `* [Home](https://www.zainezq.com/home)\n`;
    
    // Add Blogs section with dynamic content
    sitemapMd += `* [Blogs](https://www.zainezq.com/blogs)\n`;
    
    // Sort blogs by id (oldest first)
    const sortedBlogs = [...this.blogMetadata].sort((a, b) => a.id - b.id);
    
    // Add each blog post
    sortedBlogs.forEach(blog => {
      sitemapMd += `  * [${blog.title}](https://zainezq.com/blogs/${blog.slug})\n`;
    });
    
    // Add Projects section with dynamic content
    sitemapMd += `* [Projects](https://www.zainezq.com/projects)\n`;
    
    // Sort projects by id (oldest first, or however you prefer)
    const sortedProjects = [...this.projectMetadata].sort((a, b) => a.id - b.id);
    
    // Add each project
    sortedProjects.forEach(project => {
      sitemapMd += `  * [${project.title}](https://www.zainezq.com/projects/${project.slug})\n`;
    });
    
    // Add the rest of your static sitemap sections
    sitemapMd += `* [Contact](https://www.zainezq.com/contact)\n`;
    sitemapMd += `* [Quizzes](https://www.zainezq.com/quizzes)\n`;
    sitemapMd += `* [Now](https://www.zainezq.com/now)\n`;
    sitemapMd += `* [Changelog](https://www.zainezq.com/changelog)\n`;
    
    // Convert the markdown to HTML, ensuring we have a string
    const htmlResult = marked(sitemapMd);
    
    // Handle both cases - if it's a Promise or a string
    if (htmlResult instanceof Promise) {
      htmlResult.then(html => {
        this.sitemapContent = this.sanitizer.bypassSecurityTrustHtml(html);
      });
    } else {
      this.sitemapContent = this.sanitizer.bypassSecurityTrustHtml(htmlResult);
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
