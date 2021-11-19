import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NextripRoute } from '../shared/NextripRoute';
import { Direction } from '../shared/Direction';
import { Stop } from '../shared/Stop';

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

  getRoutes(): Observable<NextripRoute[]>{
    let url = 'https://svc.metrotransit.org/nextripv2/routes';
    return this.http.get<NextripRoute[]>(url, httpOptions)
      .pipe(catchError(HttpClientService.handleError));
  }

  getDirection(route_id): Observable<Direction[]>{
    let url = `https://svc.metrotransit.org/nextripv2/directions/${route_id}`;
    return this.http.get<Direction[]>(url, httpOptions)
      .pipe(catchError(HttpClientService.handleError));
  }
  getStops(route_id, direction_id): Observable<Stop[]>{
    let url = `https://svc.metrotransit.org/nextripv2/stops/${route_id}/${direction_id}`;
    return this.http.get<Stop[]>(url, httpOptions)
      .pipe(catchError(HttpClientService.handleError));
  }
  getStopsInformation(route, direction, stop): Observable<any>{
    let url = `https://svc.metrotransit.org/nextripv2/${route}/${direction}/${stop}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(catchError(HttpClientService.handleError));
  }
  getStopsInformationByStopID(stopID): Observable<any>{
    let url = `https://svc.metrotransit.org/nextripv2/${stopID}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(catchError(HttpClientService.handleError));
  }
}
