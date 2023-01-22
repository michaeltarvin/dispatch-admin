import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FuryCardModule } from '../../../@fury/shared/card/card.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { ScrollbarModule } from '../../../@fury/shared/scrollbar/scrollbar.module';
import { AgGridModule } from 'ag-grid-angular';
import { TableModule } from "../../core/table/table.module";
import { CustomerTypesComponent } from './customer-types.component';
import { CustomerTypesRoutingModule } from './customer-types-routing.module';
import { AddEditCustomerTypeComponent } from './add-edit-customer-type/add-edit-customer-type.component';

@NgModule({
  declarations: [
    CustomerTypesComponent,
    AddEditCustomerTypeComponent
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
    CustomerTypesRoutingModule
  ],
})
export class CustomerTypesModule { }
