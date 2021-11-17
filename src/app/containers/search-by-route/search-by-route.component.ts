import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/services/http-services.service';
import { NextripRoutes } from 'src/app/shared/NextripRoutes';

@Component({
  selector: 'app-search-by-route',
  templateUrl: './search-by-route.component.html',
  styleUrls: ['./search-by-route.component.css']
})
export class SearchByRouteComponent implements OnInit {
  vList: NextripRoutes[];
  valueFromSelect;

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit(){
    this.getNextripRoutes();
  }
  getNextripRoutes(){
    return this.httpClientService.getRoutes().subscribe(
      response => {
        //console.log(response);
        this.vList = response;
      },
      error => { console.log(error);}
    )
  }
  onSelect(){
    console.log(this.valueFromSelect);
  }

}
