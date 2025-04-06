import { Injectable } from '@angular/core';
import { BlogPost } from '../blog-service/blog.service';
import { BlogService } from '../blog-service/blog.service';
import {Observable, forkJoin, map} from 'rxjs';
import {marked} from 'marked';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

export interface RSSItem {
  title: string;
  slug: string;
  summary: string;
  date: string;
  type: 'blog' | 'project' | 'changelog';
  content?: string;
}


@Injectable({
  providedIn: 'root',
})
export class RssService {
  siteUrl = 'https://zainezq.com';

  constructor(private blogService: BlogService,     private sanitizer: DomSanitizer) {}

	generateRSS(items: RSSItem[]): Observable<string> {
		const rssHeader = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
  <title>Zaine's Website</title>
  <link>${this.siteUrl}</link>
  <description>Latest updates from zainezq.com</description>
  <language>en-us</language>`;

		const contentObservables = items.map(item =>
			this.blogService.getContentBySlugAndType(item.slug, item.type).pipe(
				map(rawContent => {
					const htmlContent = marked(rawContent);
					const safeHtml = typeof htmlContent === 'string'
						? this.sanitizer.bypassSecurityTrustHtml(htmlContent)
						: '';

					return `
  <item>
    <title>${item.title}</title>
    <link>${this.siteUrl}/${item.type}/${item.slug}</link>
    <description>${item.summary}</description>
    <pubDate>${new Date(item.date).toUTCString()}</pubDate>
    <guid>${this.siteUrl}/${item.type}/${item.slug}</guid>
    <content:encoded><![CDATA[${safeHtml}]]></content:encoded>
  </item>`;
				})
			)
		);

		return forkJoin(contentObservables).pipe(
			map(items => rssHeader + items.join('') + '\n</channel>\n</rss>')
		);
	}

  downloadRssFeed(contentList: RSSItem[]): void {
		this.generateRSS(contentList).subscribe({
			next: (rssFeed: string) => {
				const blob = new Blob([rssFeed], { type: 'application/rss+xml' });
				const url = URL.createObjectURL(blob);
				const link = document.createElement('a');

				link.href = url;
				link.download = 'rss-feed.xml';
				link.style.display = 'none';
				document.body.appendChild(link);
				link.click();
        document.body.removeChild(link);
				URL.revokeObjectURL(url);
			},
			error: (err) => {
				console.error('Error generating RSS feed:', err);
			}
		});
	}



  //downloadRssFeed(blogList: BlogPost[]): void {
    //this.generateRSS(blogList).subscribe({
    //  next: (rssFeed) => {
    //    const blob = new Blob([rssFeed], { type: 'application/rss+xml' });
    //    const link = document.createElement('a');
    //    link.href = URL.createObjectURL(blob);
    //    link.download = 'rss-feed.xml';
    //    link.click();
    //  },
    //  error: (err) => {
    //    console.error('Error generating RSS feed:', err);
    //  },
    //});
  //}

}
