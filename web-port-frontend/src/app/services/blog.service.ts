import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  summary: string;
  content: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogsPath = 'assets/blogs/';

  constructor(private http: HttpClient) {}

  // Fetch list of blog metadata (for the blog list page)
  getBlogList(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.blogsPath}index.json`);
  }

  // Fetch a single blog by its slug
  getBlogBySlug(slug: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.blogsPath}${slug}.json`);
  }
}
