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

/*
* Class Declaraiton for SearchByRouteComponent class
*/
export class SearchByRouteComponent implements OnInit, OnDestroy {
  nextripRoutes: NextripRoute[];
  directions: Direction[];
  stops: Stop[];
  selectRoute: FormControl; selectDirection: FormControl; selectStop: FormControl;
  selectedRoute: string; selectedDirection: string; selectedStop: string;
  listOfStops;
  private ngUnSubscribe = new Subject();

  /**
  * Creates an instance of SearchByRouteComponent,
  * and Injecting HttpClientService, Router services to the component.
  */
  constructor(private httpClientService: HttpClientService,
    private router: Router) {
      this.selectRoute = new FormControl();
      this.selectDirection = new FormControl();
      this.selectStop = new FormControl();
    }

  /**
   * Callback method that handles any additional initialization tasks.
   */
  ngOnInit(){
    this.getNextripRoutes();
    this.selectRoute.valueChanges
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(value => {
      this.selectedRoute = value;
      this.getNextripDirection(this.selectedRoute);
    })
    this.selectDirection.valueChanges
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(value => {
      this.selectedDirection = value.toString();
      this.getNextripStops(this.selectedRoute, this.selectedDirection);
    })
    this.selectStop.valueChanges
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(value => {
      this.selectedStop = value;
      this.router.navigate(['/'+this.selectedRoute +'/'+this.selectedDirection+'/'+this.selectedStop]);
    });
  }

  /**
  * Get a list of active Routes for the current service day
  */
  getNextripRoutes(){
    return this.httpClientService.getRoutes()
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(
      response => {
        this.nextripRoutes = response;
        if(this.selectRoute.value)
          this.getNextripDirection(this.selectRoute.value);
      },
      error => { console.log(error);}
    )
  }

  /**
  * Get two Directions for the given Route, NB/SB or EB/WB
  * @param selectedRoute
  */
  getNextripDirection(selectedRoute){
    return this.httpClientService.getDirection(selectedRoute)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(
      response => {
        this.directions = response;
      },
      error => { console.log(error);}
    )
  }

  /**
  * Get the Timepoint Stops for the requested Route/Direction
  * @param selectedRoute
  * @param selectDirection
  */
  getNextripStops(selectedRoute, selectDirection){
    return this.httpClientService.getStops(selectedRoute, selectDirection)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(
      response => {
        this.stops = response;
      },
      error => { console.log(error);}
    )
  }

  /**
  * Get a result with stop information and real-time departures
  * @param route
  * @param direction
  * @param stop
  */
  getNextripStopsInformation(route, direction, stop){
    return this.httpClientService.getStopsInformation(route, direction, stop)
    .pipe(takeUntil(this.ngUnSubscribe))
    .subscribe(
      response => {
        console.log(response);
      },
      error => { console.log(error);}
    )
  }

  /**
  * OnDestroy function to close the open subscriptions to avoid  memory leak,
  * unexpected behaviour and performance issues.
  */
  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

}
