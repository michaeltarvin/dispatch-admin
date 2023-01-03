import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadsComponent } from './loads.component';

const routes: Routes = [
  {
    path: '',
    component: LoadsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadsRoutingModule {
}
