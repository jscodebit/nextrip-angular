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
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
import { RouterModule, Routes } from '@angular/router';
import { DisplayTableComponent } from './containers/display-table/display-table.component';
const routes: Routes = [
  { path: ':route/:direction/:stop', component: DisplayTableComponent, pathMatch: 'full' },
  { path: ':stopNumber', component: DisplayTableComponent, pathMatch: 'full' }
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TabsComponent,
    TabComponent,
    SearchByRouteComponent,
    SearchByStopComponent,
    DataTableComponent,
    DisplayTableComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(routes, {useHash: false})
  ],
  providers: [
    HttpClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
