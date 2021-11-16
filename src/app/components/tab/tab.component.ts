import { Component, Input, OnInit } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-tab',
  host: {
    "[class.hidden]": "!active"
  },
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  @Input() active: boolean;
  @Input() tabTitle: string;

  constructor(tabs: TabsComponent) {
    tabs.addTab(this);
   }

  ngOnInit(){
  }
  getTabTitle() {
    return this.tabTitle;
  }

}
