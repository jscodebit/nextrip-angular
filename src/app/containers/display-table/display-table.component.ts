import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpClientService } from 'src/app/services/http-services.service';
import { StopInformationDataModel } from 'src/app/shared/StopInformationDataModel';

@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrls: ['./display-table.component.css']
})

/*
* Class Declaraiton for DisplayTableComponent class
*/
export class DisplayTableComponent implements OnDestroy {
  headElements = ['ROUTE', 'DESTINATION', 'DEPARTS'];
  stopInformation: any = null;
  stopID: string; route : string; direction: string; stop: string;
  tableDescription: string;
  tableStop_ID: string;
  tablefieldElements: Object[];
  emptyRecords: boolean = false;
  private ngUnSubscribe = new Subject();

  /**
  * Creates an instance of DisplayTableComponent,
  * and Injecting ActivatedRoute, HttpClientService services to the component.
  */
  constructor(private activateRoute : ActivatedRoute,
        private httpClientService: HttpClientService,){
    this.activateRoute.paramMap
    .pipe(takeUntil(this.ngUnSubscribe))
    .subscribe((params: Params) => {
      this.route = params.get('route');
      this.direction = params.get('direction');
      this.stop = params.get('stop');
      this.stopID = params.get('stop_id');
      if (this.route && this.direction && this.stop) {
        this.fetchNextripRouteInfo(this.route, this.direction, this.stop);
      }
      if (this.stopID) {
        this.fetchNextripInfoByStopID(this.stopID);
      }
    })
  }

  /**
  * Get a result with stop information and real-time departures using 'route', 'direction' and 'stop_id' params
  */
  private fetchNextripRouteInfo(route: string, direction: string, stop: string) {
    this.httpClientService.getStopsInformation(route, direction, stop)
    .pipe(takeUntil(this.ngUnSubscribe))
    .subscribe(this.populateDataToTable.bind(this));
  }

  /**
  * Get a result with stop information and real-time departures using 'stop_id'
  */
  private fetchNextripInfoByStopID(stopID: string){
    this.httpClientService.getStopsInformationByStopID(stopID)
    .pipe(takeUntil(this.ngUnSubscribe))
    .subscribe(this.populateDataToTable.bind(this));
  }

  /**
  * Function to populate data on to the table
  */
  populateDataToTable(response: StopInformationDataModel){
    if (response) {
      response = JSON.parse(JSON.stringify(response)); //To do
      this.tableDescription = response['stops'][0].description;
      this.tableStop_ID = response['stops'][0].stop_id.toString();
      this.tablefieldElements = [...response['departures']];
      if(this.tablefieldElements.length === 0)
        this.emptyRecords = true;
    }
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
