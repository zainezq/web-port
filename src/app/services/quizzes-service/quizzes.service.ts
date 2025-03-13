import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface QuizPost {
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
export class QuizzesService {
  private quizzesPath = 'assets/quizzes/';

  constructor(private http: HttpClient) {}

  getQuizList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.quizzesPath}index.json`);
  }
  getQuizContent(slug: string): Observable<string> {
    return this.http.get(`${this.quizzesPath}${slug}.md`, { responseType: 'text' });
  }
}
