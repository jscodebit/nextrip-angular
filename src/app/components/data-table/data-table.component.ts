import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() dataTableTitle: string = '';
  @Input() stopID: number;
  @Input() headElements: string[];
  @Input() fieldElements: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
