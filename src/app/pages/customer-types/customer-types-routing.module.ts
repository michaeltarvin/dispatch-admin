import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerTypesComponent } from './customer-types.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerTypesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerTypesRoutingModule {
}
