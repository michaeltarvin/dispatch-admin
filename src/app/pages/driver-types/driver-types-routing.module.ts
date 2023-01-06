import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverTypesComponent } from './driver-types.component';

const routes: Routes = [
  {
    path: '',
    component: DriverTypesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverTypesRoutingModule {
}
