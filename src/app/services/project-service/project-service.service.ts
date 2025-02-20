import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface ProjectPost {
  id: number;
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  private projectsPath = 'assets/projects/'

  constructor(private http: HttpClient) { }

  getProjectList(): Observable<ProjectPost[]> {
    return this.http.get<ProjectPost[]>(`${this.projectsPath}index.json`);
  }

  getProjectContent(slug: string): Observable<string> {
    return this.http.get(`assets/projects/${slug}.md`, { responseType: 'text' });
  }

}
