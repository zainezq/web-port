import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BlogPost, BlogService} from '../../services/blog-service/blog.service';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';
import {RssService} from '../../services/rss/rss.service';
import {ContentAggregatorService} from '../../services/content-aggregator/content-aggregator.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  styleUrls: ['./blog-list.component.scss'],

})
export class BlogListComponent implements OnInit {
  blogs: BlogPost[] = [];
  tags = ['All', "Technology" , 'Productivity', 'Education', 'Programming', 'Self Improvement'];
  selectedTag = 'All';
  constructor(private blogService: BlogService, private rssService: RssService,
              private contentAggregator: ContentAggregatorService) {}

  ngOnInit(): void {
    this.blogService.getBlogList().subscribe(data => {
      this.blogs = data;
    });


  }
  downloadRSS() {
    this.contentAggregator.getAllRssItems().subscribe({
      next: (rssItems) => {
        this.rssService.downloadRssFeed(rssItems);
      },
      error: (err) => {
        console.error('Failed to fetch content for RSS:', err);
      }
    });
  }

  get filteredBlogs() {
    return this.selectedTag === 'All' ? this.blogs : this.blogs.filter(blog => blog.tags?.includes(this.selectedTag));
  }

  selectTag(tag: string) {
    this.selectedTag = tag;
  }
}
