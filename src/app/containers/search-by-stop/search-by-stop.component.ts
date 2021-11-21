import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-by-stop',
  templateUrl: './search-by-stop.component.html',
  styleUrls: ['./search-by-stop.component.css']
})

/*
* Class Declaraiton for SearchByStopComponent class
*/
export class SearchByStopComponent {
  searchByStopIDForm: FormGroup;
  stopInputField: FormControl;

  /**
  * Injecting Router service to the component.
  */
  constructor(private router: Router) {
      this.searchByStopIDForm = new FormGroup({
        stopInputField: new FormControl()
      })
    }

  /**
  * ngSubmit event to redirect to 'https://ng-http-c5d2a.web.app/${stop_id}'
  */
  onSubmit(){
    this.router.navigate(['/' + this.searchByStopIDForm.get('stopInputField').value]);
    this.searchByStopIDForm.reset();
  }

}
