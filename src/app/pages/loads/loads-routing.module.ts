import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadsComponent } from './loads.component';
import { BrokerageComponent } from './brokerage/brokerage.component';

const routes: Routes = [
  {
    path: '',
    component: LoadsComponent
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
