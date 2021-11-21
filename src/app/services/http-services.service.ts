import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NextripRoute } from '../shared/NextripRoute';
import { Direction } from '../shared/Direction';
import { Stop } from '../shared/Stop';
import { StopInformationDataModel } from '../shared/StopInformationDataModel';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
};
const baseURL : string = 'https://svc.metrotransit.org/nextripv2';
@Injectable()
export class HttpClientService {
  constructor(private http: HttpClient){
  }
  invokeHttpRequest(url){
    return this.http.get<NextripRoute[] | Direction[] | Stop[] | StopInformationDataModel>(url, httpOptions)
      .pipe(catchError(HttpClientService.handleError));
  }
  getRoutes(): Observable<NextripRoute[]>{
    let url = `${baseURL}/routes`;
    return this.invokeHttpRequest(url) as Observable<NextripRoute[]>;
  }

  getDirection(route_id): Observable<Direction[]>{
    let url = `${baseURL}/directions/${route_id}`;
    return this.invokeHttpRequest(url) as Observable<Direction[]>;
  }
  getStops(route_id, direction_id): Observable<Stop[]>{
    let url = `${baseURL}/stops/${route_id}/${direction_id}`;
    return this.invokeHttpRequest(url) as Observable<Stop[]>;
  }
  getStopsInformation(route, direction, stop): Observable<StopInformationDataModel>{
    let url = `${baseURL}/${route}/${direction}/${stop}`;
    return this.invokeHttpRequest(url) as Observable<StopInformationDataModel>;
  }
  getStopsInformationByStopID(stopID): Observable<StopInformationDataModel>{
    let url = `${baseURL}/${stopID}`;
    // return this.http.get<any>(url, httpOptions)
    //   .pipe(catchError(HttpClientService.handleError));
    return this.invokeHttpRequest(url) as Observable<StopInformationDataModel>;
  }

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
}
