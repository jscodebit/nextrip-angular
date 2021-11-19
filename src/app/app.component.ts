import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  appTitle = 'Nextrip Angular';

  constructor(){}
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
