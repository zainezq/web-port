import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Register } from './register.model';
import { ApplicationConfigService } from '../core/application-config.service';
import { environment} from "../core/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly resourceUrl: string;
  constructor(
    private applicationConfigService: ApplicationConfigService,
    private http: HttpClient
  ) {
    this.resourceUrl = this.applicationConfigService.getEndpointFor('api/register/');
  }

  register(register: Register): Observable<any> {
    console.log(this.resourceUrl);
    return this.http.post<any>(this.resourceUrl, register).pipe(
      catchError(error => {
        // Handle error appropriately (e.g., log error, transform error, throw custom error)
        console.error('Error during register:', error);
        return throwError(error); // Rethrow the error or handle it as needed
      })
    );
  }
}
