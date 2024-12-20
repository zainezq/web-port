import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:9000/api/contact/send'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  sendEmail(emailData: { userEmail: string; subject: string; message: string }): Observable<any> {
    return this.http.post(this.apiUrl, emailData);
  }
}
