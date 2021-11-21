import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientService } from 'src/app/services/http-services.service';
import { StopInformationDataModel } from 'src/app/shared/StopInformationDataModel';

@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrls: ['./display-table.component.css']
})
export class DisplayTableComponent implements OnInit {
  headElements = ["ROUTE", "DESTINATION", "DEPARTS"];
  stopInformation: any = null;
  stopID: string; route : string; direction: string; stop: string;
  tableDescription: string; tableStop_ID: string; tablefieldElements: []; emptyRecords: boolean = false;
  //private ngUnSubscribe = new Subject();

  constructor(private activateRoute : ActivatedRoute,
        private httpClientService: HttpClientService,){
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

  ngOnInit(): void {
    // this.activateRoute.queryParams
    // .pipe(takeUntil(this.ngUnSubscribe))
    // .subscribe(params => {
    //   this.route = params['route'];
    //   this.direction = params['direction'];
    //   this.stop = params['stop'];
    //   this.stopID = params['stop_id'];
    // });
  }

  private fetchNextripRouteInfo(route: string, direction: string, stop: string) {
    this.httpClientService.getStopsInformation(route, direction, stop)
    .subscribe(response => {
      this.stopInformation = response;
      if (this.stopInformation) {
        this.populateDataToTable(this.stopInformation);
      }
    });
  }

  private fetchNextripInfoByStopID(stopID: string){
    this.httpClientService.getStopsInformationByStopID(stopID)
    .subscribe(response => {
      this.stopInformation = response;
      if (this.stopInformation) {
        this.populateDataToTable(this.stopInformation);
      }
    });
  }

  populateDataToTable(stopInformation: string){
    this.tableDescription = this.stopInformation['stops'][0].description;
    this.tableStop_ID = this.stopInformation['stops'][0].stop_id;
    this.tablefieldElements = this.stopInformation['departures'];
    if(this.tablefieldElements.length === 0)
      this.emptyRecords = true;
    //console.log(typeof this.tablefieldElements, this.tablefieldElements)
  }

}
