import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpClientService } from 'src/app/services/http-services.service';

@Component({
  selector: 'app-search-by-stop',
  templateUrl: './search-by-stop.component.html',
  styleUrls: ['./search-by-stop.component.css']
})
export class SearchByStopComponent implements OnInit {
  stopInputField: FormControl;

  constructor(private httpClientService: HttpClientService,
    private router: Router) { }

  ngOnInit(): void {
    this.stopInputField = new FormControl();
    this.stopInputField.valueChanges
    .pipe(debounceTime(800),
        distinctUntilChanged()
   ).subscribe(value => {
    this.router.navigate(['/'+value]);
    })
  }

}
