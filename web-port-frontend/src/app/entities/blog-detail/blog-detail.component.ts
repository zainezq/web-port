import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BlogPost, BlogService} from '../../services/blog.service';
import {NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  standalone: true,
  imports: [
    NgIf
  ],
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  blog: BlogPost | undefined;
  slug: string | undefined = '';

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    const path = this.route.snapshot.url.join('/');
    this.slug = path.split('/').pop();
    if (this.slug) {
      console.log(this.slug);
      this.blogService.getBlogBySlug(this.slug).subscribe((data) => {
        this.blog = data;
      });
    }
  }
}
