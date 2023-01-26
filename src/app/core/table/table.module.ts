import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FuryCardModule } from '../../../@fury/shared/card/card.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { TableComponent } from './table.component';
import { ScrollbarModule } from '../../../@fury/shared/scrollbar/scrollbar.module';
import { AgGridModule } from 'ag-grid-angular';
import { CurrencyRenderer } from './currency.render.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FuryCardModule,
    ScrollbarModule,
    AgGridModule,
  ],
  declarations: [
    TableComponent,
    CurrencyRenderer],
  exports: [
    TableComponent
  ]
})
export class TableModule {
}
