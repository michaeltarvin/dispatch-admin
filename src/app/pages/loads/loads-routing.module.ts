import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadsComponent } from './loads.component';
import { BrokerageComponent } from './brokerage/brokerage.component';
import { BackHaulComponent } from './back-haul/back-haul.component';

const routes: Routes = [
  {
    path: '',
    component: LoadsComponent
  },
  {
    path: 'back-hauls',
    component: BackHaulComponent
  },
  {
    path: 'brokerage',
    component: BrokerageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadsRoutingModule {
}
