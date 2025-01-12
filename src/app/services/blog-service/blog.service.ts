import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  summary: string;
  date: string;
  readingTime?: string;
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

  // Fetch an individual blog post
  getBlogContent(slug: string): Observable<string> {
    return this.http.get(`assets/blogs/${slug}.md`, { responseType: 'text' });
  }

}
