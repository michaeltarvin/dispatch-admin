import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FuryCardModule } from '../../../@fury/shared/card/card.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { ScrollbarModule } from '../../../@fury/shared/scrollbar/scrollbar.module';
import { AgGridModule } from 'ag-grid-angular';
import { TableModule } from "../../core/table/table.module";
import { DriverTypesComponent } from './driver-types.component';
import { DriverTypesRoutingModule } from './driver-types-routing.module';
import { AddEditDriverTypeComponent } from './add-edit-driver-type/add-edit-driver-type.component';

@NgModule({
  declarations: [
    DriverTypesComponent,
    AddEditDriverTypeComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FuryCardModule,
    ScrollbarModule,
    AgGridModule,
    TableModule,
    DriverTypesRoutingModule
  ],
})
export class DriverTypesModule { }
