import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/services/http-services.service';

@Component({
  selector: 'app-search-by-stop',
  templateUrl: './search-by-stop.component.html',
  styleUrls: ['./search-by-stop.component.css']
})
export class SearchByStopComponent implements OnInit {
  searchByStopIDForm: FormGroup;
  stopInputField: FormControl;

  constructor(private httpClientService: HttpClientService,
    private router: Router) {
      this.searchByStopIDForm = new FormGroup({
        stopInputField: new FormControl()
      })
    }

  ngOnInit(): void {
  }

  onSubmit(){
    //debugger;
    this.router.navigate(['/' + this.searchByStopIDForm.get('stopInputField').value]);
    this.searchByStopIDForm.reset();
  }

}
