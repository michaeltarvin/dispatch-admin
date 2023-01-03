import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { FuryCardModule } from '../../../@fury/shared/card/card.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { ScrollbarModule } from '../../../@fury/shared/scrollbar/scrollbar.module';
import { AgGridModule } from 'ag-grid-angular';
import { TableModule } from "../../core/table/table.module";
import { CustomersRoutingModule } from './customers-routing.module';
import { ShippersComponent } from './shippers/shippers.component';
import { BillersComponent } from './billers/billers.component';
import { ReceiversComponent } from './receivers/receivers.component';
import { AddEditCustomerComponent } from './add-edit-customer/add-edit-customer.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BreadcrumbsModule,
    FuryCardModule,
    ScrollbarModule,
    AgGridModule,
    TableModule,
    CustomersRoutingModule,
  ],
  declarations: [
    ShippersComponent,
    BillersComponent,
    ReceiversComponent,
    AddEditCustomerComponent,
  ]
})
export class CustomersModule {
}
