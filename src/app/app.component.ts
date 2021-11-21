import { Component, OnInit, ViewChild } from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  appTitle = 'Nextrip Angular';
  @ViewChild('map', { static: true }) mapElement: any;
  map: google.maps.Map;

  constructor(){}
  ngOnInit(){
    // this.stopInformation = this.nextripRoutesService.passStopDetails();
    // if(this.stopInformation){
    //   this.stopID = this.stopInformation.stops[0].stop_id | 1234;
    // }
    const mapProperties = {
      center: new google.maps.LatLng(35.2271, -80.8431),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  }

  notifyMe(event){
    //console.log(event);
  }
}
