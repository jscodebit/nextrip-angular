import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";
import { StopInformationDataModel } from "../shared/StopInformationDataModel";

import { HttpClientService } from "./http-services.service";

@Injectable()
export class NextripRoutesService implements OnInit{

  result: Observable<StopInformationDataModel[]>;

  constructor(){}

  ngOnInit(){

  }
  getStopInformation(data): void{
    this.result = data;
  }

  passStopDetails(){
    return this.result;
  }
}
