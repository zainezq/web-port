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
  tags = ['All', 'Technology', 'Development', 'Personal Growth', 'Research & Insights', 'Learning'];
  selectedTag = 'All';
  
  // Map old tags to new tag structure
  tagMapping: {[key: string]: string} = {
    'Technology': 'Technology',
    'Programming': 'Development',
    'Productivity': 'Personal Growth',
    'Self Improvement': 'Personal Growth',
    'Education': 'Learning'
  };

  constructor(private blogService: BlogService, private rssService: RssService,
              private contentAggregator: ContentAggregatorService) {}

  ngOnInit(): void {
    this.blogService.getBlogList().subscribe(data => {
      // Map old tags to new tags for each blog post
      this.blogs = data.map(blog => {
        if (blog.tags) {
          // Convert old tags to new tag structure
          const newTags = Array.from(new Set(
            blog.tags.map(tag => this.tagMapping[tag] || tag)
          ));
          
          // Add Research & Insights tag for relevant content
          if ((blog.tags.includes('Education') || blog.tags.includes('Productivity')) && 
              (blog.title.includes('Reflection') || blog.summary.includes('analysis') || 
               blog.title.includes('Guide') || blog.title.includes('Introduction'))) {
            newTags.push('Research & Insights');
          }
          
          return {...blog, tags: newTags};
        }
        return blog;
      });
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
    const blogs = this.selectedTag === 'All' 
      ? this.blogs 
      : this.blogs.filter(blog => {
          // Check if the blog has any tag that matches the selected category or its mappings
          return blog.tags?.some(tag => 
            tag === this.selectedTag || 
            Object.entries(this.tagMapping).find(([oldTag, newTag]) => 
              newTag === this.selectedTag && oldTag === tag
            )
          );
        });
    
    // Return a reversed copy of the filtered array
    return [...blogs].reverse();
  }

  selectTag(tag: string) {
    this.selectedTag = tag;
  }
}
