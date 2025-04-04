import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BlogPost, BlogService} from '../../services/blog-service/blog.service';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';
import {RssService} from '../../services/rss/rss.service';
import {RssDownloadComponent} from './RssDownloadComponent';

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
  constructor(private blogService: BlogService, private rssService: RssService) {}

  ngOnInit(): void {
    this.blogService.getBlogList().subscribe(data => {
      this.blogs = data;
    });


  }
  downloadRSS() {
    this.rssService.downloadRssFeed(this.blogs);
  }

  get filteredBlogs() {
    return this.selectedTag === 'All' ? this.blogs : this.blogs.filter(blog => blog.tags?.includes(this.selectedTag));
  }

  selectTag(tag: string) {
    this.selectedTag = tag;
  }
}
