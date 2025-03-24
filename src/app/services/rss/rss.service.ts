import { Injectable } from '@angular/core';
import { BlogPost } from '../blog-service/blog.service';
import { BlogService } from '../blog-service/blog.service';
import {Observable, forkJoin, map} from 'rxjs';
import {marked} from 'marked';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class RssService {
  siteUrl = 'https://zainezq.com';
  blogContent: SafeHtml = '';

  constructor(private blogService: BlogService,     private sanitizer: DomSanitizer) {}

  generateRSS(blogList: BlogPost[]): Observable<string> {
    const rssHeader = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
    <title>Your Blog Name</title>
    <link>${this.siteUrl}</link>
    <description>Your blog description</description>
    <language>en-us</language>`;

    const blogContentObservables = blogList.map((post) =>
      this.blogService.getBlogContent(post.slug).pipe(
        map((content) => {
          const htmlContent = marked(content);
          if (typeof htmlContent === "string") {
            this.blogContent = this.sanitizer.bypassSecurityTrustHtml(htmlContent);
          }
          return `
    <item>
        <title>${post.title}</title>
        <link>${this.siteUrl}/blog/${post.slug}</link>
        <description>${post.summary}</description>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <guid>${this.siteUrl}/blog/${post.slug}</guid>
        <content:encoded><![CDATA[${this.blogContent}]]></content:encoded>
    </item>`;
        })
      )
    );

    return forkJoin(blogContentObservables).pipe(
      map((rssItems) => {
        const rssFooter = `
</channel>
</rss>`;

        return rssHeader + rssItems.join('') + rssFooter;
      })
    );
  }
  downloadRssFeed(blogList: BlogPost[]): void {
    this.generateRSS(blogList).subscribe({
      next: (rssFeed) => {
        const blob = new Blob([rssFeed], { type: 'application/rss+xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'rss-feed.xml';
        link.click();
      },
      error: (err) => {
        console.error('Error generating RSS feed:', err);
      },
    });
  }

}
