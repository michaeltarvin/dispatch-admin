import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FuryCardModule } from '../../../@fury/shared/card/card.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { ScrollbarModule } from '../../../@fury/shared/scrollbar/scrollbar.module';
import { AgGridModule } from 'ag-grid-angular';
import { TableModule } from "../../core/table/table.module";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CustomerAutoCompleteModule } from "../../core/customer-auto-complete/customer-auto-complete.module";
import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from '../payments/payments.component';

@NgModule({
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FuryCardModule,
    ScrollbarModule,
    AgGridModule,
    TableModule,
    CurrencyMaskModule,
    CustomerAutoCompleteModule,
  ],
  declarations: [
    PaymentsComponent
  ],
})
export class PaymentsModule { }
