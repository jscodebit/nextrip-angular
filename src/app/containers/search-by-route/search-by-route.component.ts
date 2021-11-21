import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { HttpClientService } from 'src/app/services/http-services.service';
import { Direction } from 'src/app/shared/Direction';
import { NextripRoute } from 'src/app/shared/NextripRoute';
import { Stop } from 'src/app/shared/Stop';

@Component({
  selector: 'app-search-by-route',
  templateUrl: './search-by-route.component.html',
  styleUrls: ['./search-by-route.component.css']
})
export class SearchByRouteComponent implements OnInit, OnDestroy {
  nextripRoutes: NextripRoute[];
  directions: Direction[];
  stops: Stop[];
  selectRoute: FormControl; selectDirection: FormControl; selectStop: FormControl;
  selectedRoute: string; selectedDirection: string; selectedStop: string;
  listOfStops;
  private ngUnSubscribe = new Subject();

  constructor(private httpClientService: HttpClientService,
    private router: Router) {
      this.selectRoute = new FormControl();
      this.selectDirection = new FormControl();
      this.selectStop = new FormControl();
    }

  ngOnInit(){
    this.getNextripRoutes();
    this.selectRoute.valueChanges
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(value => {
      //console.log(typeof this.selectedRoute);
      this.selectedRoute = value;
      this.getNextripDirection(this.selectedRoute);
    })
    this.selectDirection.valueChanges
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(value => {
      //console.log(value);
      this.selectedDirection = value.toString();
      this.getNextripStops(this.selectedRoute, this.selectedDirection);
    })
    this.selectStop.valueChanges
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(value => {
      //console.log(value);
      this.selectedStop = value;
      this.router.navigate(['/'+this.selectedRoute +'/'+this.selectedDirection+'/'+this.selectedStop]);
    });
  }

  getNextripRoutes(){
    return this.httpClientService.getRoutes()
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(
      response => {
        //console.log(response);
        this.nextripRoutes = response;
        if(this.selectRoute.value)
          this.getNextripDirection(this.selectRoute.value);
      },
      error => { console.log(error);}
    )
  }
  getNextripDirection(selectedRoute){
    return this.httpClientService.getDirection(selectedRoute)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(
      response => {
        //console.log(response);
        this.directions = response;
      },
      error => { console.log(error);}
    )
  }
  getNextripStops(selectedRoute, selectDirection){
    return this.httpClientService.getStops(selectedRoute, selectDirection)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(
      response => {
        //console.log(response);
        this.stops = response;
      },
      error => { console.log(error);}
    )
  }
  getNextripStopsInformation(route, direction, stop){
    return this.httpClientService.getStopsInformation(route, direction, stop)
    .pipe(takeUntil(this.ngUnSubscribe))
    .subscribe(
      response => {
        console.log(response);
        //this.listOfStops = response;
      },
      error => { console.log(error);}
    )
  }
  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

}
