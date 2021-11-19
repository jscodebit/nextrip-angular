import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientService } from 'src/app/services/http-services.service';

@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrls: ['./display-table.component.css']
})
export class DisplayTableComponent implements OnInit {
  headElements = ["ROUTE", "DESTINATION", "DEPARTS"];
  stopInformation: any = null;
  stopID: number; route : string; direction: string; stop: string;
  tableDescription: string; tableStop_ID: string; tablefieldElements: [];

  constructor(private activateRoute : ActivatedRoute,
        private httpClientService: HttpClientService,){
    this.route = this.activateRoute.snapshot.paramMap.get("route");
    this.direction = this.activateRoute.snapshot.paramMap.get("direction");
    this.stop = this.activateRoute.snapshot.paramMap.get("stop");
    this.httpClientService.getStopsInformation(this.route, this.direction, this.stop).subscribe(response => {
      this.stopInformation = response;
      if(this.stopInformation){
        this.populateDataToTabe(this.stopInformation);
      }
    });
  }

  ngOnInit(): void {

  }
  populateDataToTabe(stopInformation){
    this.tableDescription = this.stopInformation['stops'][0].description;
    this.tableStop_ID = this.stopInformation['stops'][0].stop_id;
    this.tablefieldElements = this.stopInformation['departures'];
    //console.log(typeof this.tablefieldElements, this.tablefieldElements)
  }

}
