import {Component, OnInit} from '@angular/core';
import { RssService} from '../../services/rss/rss.service';
import {BlogPost, BlogService} from '../../services/blog-service/blog.service';

@Component({
  selector: 'app-rss-download',
  template: `<button class="rss-button" (click)="downloadRss()">Download RSS Feed</button>`,
})
export class RssDownloadComponent implements OnInit{
  blogList: BlogPost[] = [];

  constructor(private rssService: RssService, private blogService: BlogService) {}

  downloadRss(): void {
    this.rssService.downloadRssFeed(this.blogList);
  }

  ngOnInit(): void {
    this.blogService.getBlogList().subscribe(data => {
      this.blogList = data;
    });
  }
}
