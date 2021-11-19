import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tab/tab.component';
import { SearchByRouteComponent } from './containers/search-by-route/search-by-route.component';
import { SearchByStopComponent } from './containers/search-by-stop/search-by-stop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientService } from './services/http-services.service';
import { NextripRoutesService } from './services/nextrip-routes.service';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TabsComponent,
    TabComponent,
    SearchByRouteComponent,
    SearchByStopComponent,
    DataTableComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    HttpClientService,
    NextripRoutesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
