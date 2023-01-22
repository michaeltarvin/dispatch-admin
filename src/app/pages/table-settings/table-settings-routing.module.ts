import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableSettingsComponent } from './table-settings.component';

const routes: Routes = [
  {
    path: '',
    component: TableSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableSettingsRoutingModule { }
