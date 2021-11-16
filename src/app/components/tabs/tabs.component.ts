import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  ifTabSelected: boolean = false;
  tabs: TabComponent[] = [];
  @Output() currentTabChange = new EventEmitter<TabComponent>();

  constructor() { }

  ngOnInit(): void {
  }

  addTab(tab: TabComponent) {
    this.tabs.push(tab);
	}

  selectTab(tab: TabComponent) {
    this.tabs.forEach(tab => {
      tab.active = false;
    });
    tab.active = true;
    this.currentTabChange.emit(tab);
	}

  ngAfterViewInit() {
    setTimeout(()=>{
      this.tabs.map(tab => {
        if (tab.active) {
          this.selectTab(tab);
          this.ifTabSelected = true;
        }
      });
      if (!this.ifTabSelected) {
        this.selectTab(this.tabs[0]);
      }
    },0)
  }

}
