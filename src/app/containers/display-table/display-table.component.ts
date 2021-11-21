import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class DisplayTableComponent implements OnInit, OnDestroy {
  headElements = ['ROUTE', 'DESTINATION', 'DEPARTS'];
  stopInformation: any = null;
  stopID: string; route : string; direction: string; stop: string;
  tableDescription: string;
  tableStop_ID: string;
  tablefieldElements: Object[];
  emptyRecords: boolean = false;
  private ngUnSubscribe = new Subject();

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

  ngOnInit(): void {
  }

  private fetchNextripRouteInfo(route: string, direction: string, stop: string) {
    this.httpClientService.getStopsInformation(route, direction, stop)
    .pipe(takeUntil(this.ngUnSubscribe))
    .subscribe(this.populateDataToTable.bind(this));
  }

  private fetchNextripInfoByStopID(stopID: string){
    this.httpClientService.getStopsInformationByStopID(stopID)
    .pipe(takeUntil(this.ngUnSubscribe))
    .subscribe(this.populateDataToTable.bind(this));
  }

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

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

}
