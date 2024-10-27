import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApplicationConfigService} from '../core/application-config.service';
import {Register} from './register.model';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly resourceUrl: string;
  constructor(
    private applicationConfigService: ApplicationConfigService,
    private http: HttpClient
  ) {
    this.resourceUrl = this.applicationConfigService.getEndpointFor('register/');
  }

  register(register: Register): Observable<any> {
    console.log(this.resourceUrl);
    return this.http.post<any>(this.resourceUrl, register).pipe(
      catchError(error => {
        console.error('Error during register:', error);
        return throwError(error);
      })
    );
  }
}
