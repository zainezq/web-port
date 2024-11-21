import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private apiUrl = 'http://localhost:9000/api/github/repositories';

  constructor(private http: HttpClient) {}

  fetchRepositories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
