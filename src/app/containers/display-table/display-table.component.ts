import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpClientService } from 'src/app/services/http-services.service';

@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrls: ['./display-table.component.css']
})
export class DisplayTableComponent implements OnInit, OnDestroy {
  headElements = ["ROUTE", "DESTINATION", "DEPARTS"];
  stopInformation: any = null;
  stopID: string; route : string; direction: string; stop: string;
  tableDescription: string; tableStop_ID: string; tablefieldElements: [];
  private ngUnSubscribe = new Subject();

  constructor(private activateRoute : ActivatedRoute,
        private httpClientService: HttpClientService,){
  }

  ngOnInit(): void {
    // this.activateRoute.queryParams
    // .pipe(takeUntil(this.ngUnSubscribe))
    // .subscribe(params => {
    //   this.route = params['route'];
    //   this.direction = params['direction'];
    //   this.stop = params['stop'];
    //   this.stopID = params['stop_id'];
    // });
    this.route = this.activateRoute.snapshot.paramMap.get("route");
    this.direction = this.activateRoute.snapshot.paramMap.get("direction");
    this.stop = this.activateRoute.snapshot.paramMap.get("stop");
    this.stopID = this.activateRoute.snapshot.paramMap.get("stop_id");
    if (this.route && this.direction && this.stop) {
      this.fetchNextripRouteInfo(this.route, this.direction, this.stop);
    }
    if (this.stopID) {
      this.fetchNextripInfoByStopID(this.stopID);
    }
  }

  private fetchNextripRouteInfo(route, direction, stop) {
    this.httpClientService.getStopsInformation(route, direction, stop)
    .pipe(takeUntil(this.ngUnSubscribe))
    .subscribe(response => {
      this.stopInformation = response;
      if (this.stopInformation) {
        this.populateDataToTabe(this.stopInformation);
      }
    });
  }

  private fetchNextripInfoByStopID(stopID){
    this.httpClientService.getStopsInformationByStopID(this.stopID)
    .pipe(takeUntil(this.ngUnSubscribe))
    .subscribe(response => {
      this.stopInformation = response;
      if (this.stopInformation) {
        this.populateDataToTabe(this.stopInformation);
      }
    });
  }

  populateDataToTabe(stopInformation){
    this.tableDescription = this.stopInformation['stops'][0].description;
    this.tableStop_ID = this.stopInformation['stops'][0].stop_id;
    this.tablefieldElements = this.stopInformation['departures'];
    //console.log(typeof this.tablefieldElements, this.tablefieldElements)
  }

  ngOnDestroy(): void{
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

}
