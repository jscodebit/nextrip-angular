/**
 * This is a Nextrip Angular application, Metro Transit real-time departure information display.
 * @author Soujanya Janapatla
 * @version 1.0.0
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/*
* Class Declaraiton for AppComponent class,
* main building block of the application.
*/
export class AppComponent implements OnInit {
  @ViewChild('map', { static: true }) mapElement: any;
  map: google.maps.Map;

  constructor(){}

  ngOnInit(){
    // const mapProperties = {
    //   center: new google.maps.LatLng(35.2271, -80.8431),
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  }
}
