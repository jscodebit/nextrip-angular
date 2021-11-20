import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayTableComponent } from './containers/display-table/display-table.component';

const routes: Routes = [
  { path: ':route/:direction/:stop', component: DisplayTableComponent, pathMatch: 'full' },
  { path: ':stop_id', component: DisplayTableComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
