import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgeingComponent } from '../ageing/ageing.component';

const routes: Routes = [
  {
    path: '',
    component: AgeingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgeingRoutingModule { }
