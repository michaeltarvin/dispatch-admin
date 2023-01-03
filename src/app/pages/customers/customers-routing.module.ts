import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippersComponent } from './shippers/shippers.component';
import { BillersComponent } from './billers/billers.component';
import { ReceiversComponent } from './receivers/receivers.component';

const routes: Routes = [
  {
    path: 'shippers',
    component: ShippersComponent
  },
  {
    path: 'billers',
    component: BillersComponent
  },
  {
    path: 'receivers',
    component: ReceiversComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule {
}
