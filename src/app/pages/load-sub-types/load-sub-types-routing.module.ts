import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadSubTypesComponent } from './load-sub-types.component';

const routes: Routes = [
  {
    path: '',
    component: LoadSubTypesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadSubTypesRoutingModule {
}
