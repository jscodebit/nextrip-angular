import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NextripRoutes } from '../shared/NextripRoutes';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
};
@Injectable()
export class HttpClientService {

  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
    } else {
        console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
    }
    return throwError(
        'Something bad happened; please try again later.');
  }
  constructor(private http: HttpClient){
  }

  getRoutes(): Observable<NextripRoutes[]>{
    let url ='https://svc.metrotransit.org/nextripv2/routes';
    return this.http.get<NextripRoutes[]>(url, httpOptions)
      .pipe(catchError(HttpClientService.handleError));
  }
}
