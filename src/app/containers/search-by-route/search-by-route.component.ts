import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';

import { HttpClientService } from 'src/app/services/http-services.service';
import { Direction } from 'src/app/shared/Direction';
import { NextripRoute } from 'src/app/shared/NextripRoute';
import { Stop } from 'src/app/shared/Stop';

@Component({
  selector: 'app-search-by-route',
  templateUrl: './search-by-route.component.html',
  styleUrls: ['./search-by-route.component.css']
})
export class SearchByRouteComponent implements OnInit {
  nextripRoutes: NextripRoute[];
  directions: Direction[];
  stops: Stop[];
  selectRoute: FormControl; selectDirection: FormControl; selectStop: FormControl;
  selectedRoute: string; selectedDirection: string; selectedStop: string;
  stopsInformation: any;

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit(){
    console.log("OnInit");
    this.selectRoute = new FormControl();
    this.selectDirection = new FormControl();
    this.selectStop = new FormControl();
    this.getNextripRoutes();
    this.selectRoute.valueChanges.subscribe(value => {
      //console.log(value);
      this.selectedRoute = value;
      this.getNextripDirection(this.selectedRoute);
    })
    this.selectDirection.valueChanges.subscribe(value => {
      //console.log(value);
      this.selectedDirection = value;
      this.getNextripStops(this.selectedRoute, this.selectedDirection);
    })
    this.selectStop.valueChanges.subscribe(value => {
      //console.log(value);
      this.selectedStop = value;
      this.getNextripStopsInformation(this.selectedRoute, this.selectedDirection, this.selectedStop)
    });
    //this.getNextripStopsInformation();
  }
  // ngOnChanges(){
  //   console.log("Hello");
  //   if(this.selectedRoute)
  //     this.getNextripDirection();
  // }
  // ngDoCheck(){
  //   //console.log("Hello");

  // }

  getNextripRoutes(){
    return this.httpClientService.getRoutes().subscribe(
      response => {
        //console.log(response);
        this.nextripRoutes = response;
        if(this.selectRoute)
          this.getNextripDirection(this.selectRoute);
      },
      error => { console.log(error);}
    )
  }
  getNextripDirection(selectedRoute){
    return this.httpClientService.getDirection(selectedRoute).subscribe(
      response => {
        //console.log(response);
        this.directions = response;
      },
      error => { console.log(error);}
    )
  }
  getNextripStops(selectedRoute, selectDirection){
    return this.httpClientService.getStops(selectedRoute, selectDirection).subscribe(
      response => {
        //console.log(response);
        this.stops = response;
      },
      error => { console.log(error);}
    )
  }
  getNextripStopsInformation(route, direction, stop){
    return this.httpClientService.getStopsInformation(route, direction, stop).subscribe(
      response => {
        console.log(response);
        this.stopsInformation = response
      },
      error => { console.log(error);}
    )
  }
  onSelect(){
    debugger;
    console.log();
    // this.httpClientService.getDirection(route.route_id).subscribe(
    //   response => {
    //     console.log(response);
    //     this.directions = response;
    //   },
    //   error => { console.log(error);}
    // )
  }

}
