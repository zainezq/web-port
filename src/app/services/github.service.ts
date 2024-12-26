import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private apiUrl = "https://api.github.com/users/zainezq/repos";

  constructor(private http: HttpClient) {}

  fetchRepositories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
