import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:4200';

  constructor(protected http: HttpClient) { }
}
