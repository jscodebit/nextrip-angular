import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './services/http-services.service';
import { NextripRoutesService } from './services/nextrip-routes.service';
import { StopInformationDataModel } from './shared/StopInformationDataModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  appTitle = 'Nextrip Angular';
  headElements = ["ROUTE", "DESTINATION", "DEPARTS"];
  stopInformation: any;
  stopID: number;

  constructor(private nextripRoutesService: NextripRoutesService){}

  ngOnInit(){
    // this.stopInformation = this.nextripRoutesService.passStopDetails();
    // if(this.stopInformation){
    //   this.stopID = this.stopInformation.stops[0].stop_id | 1234;
    // }
  }

  notifyMe(event){
    //console.log(event);
  }
}
