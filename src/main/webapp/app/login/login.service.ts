import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Login } from './login.model';
import { ApplicationConfigService } from '../core/application-config.service';
import { environment} from "../core/environments/environment";

@Injectable({ providedIn: 'root' })
export class LoginService {
  private readonly resourceUrl: string;

  constructor(
    private applicationConfigService: ApplicationConfigService,
    private http: HttpClient
  ) {
    this.resourceUrl = this.applicationConfigService.getEndpointFor('api/auth/login');
  }

  login(login: Login): Observable<any> {
    console.log(this.resourceUrl);
    return this.http.post<any>(this.resourceUrl, login).pipe(
      catchError(error => {
        // Handle error appropriately (e.g., log error, transform error, throw custom error)
        console.error('Error during login:', error);
        return throwError(error); // Rethrow the error or handle it as needed
      })
    );
  }
  test() {
    console.log("test " + this.resourceUrl);
  }
}
