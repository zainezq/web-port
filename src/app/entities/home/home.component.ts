import { HttpClient } from '@angular/common/http';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { BlogService } from '../../services/blog-service/blog.service';

@Component({
  selector: 'app-home',
  imports: [

  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{
  blogCount = 0;
  constructor(private http: HttpClient, private blogService: BlogService) {}

 ngOnInit(): void {
  this.blogService.getBlogCount().subscribe(count => {
    this.blogCount = count;
    console.log('Blog count:', this.blogCount);
  });
}
}
