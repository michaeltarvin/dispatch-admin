import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FuryCardModule } from '../../../@fury/shared/card/card.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { ScrollbarModule } from '../../../@fury/shared/scrollbar/scrollbar.module';
import { AgGridModule } from 'ag-grid-angular';
import { TableModule } from "../../core/table/table.module";
import { TableSettingsRoutingModule } from './table-settings-routing.module';
import { TableSettingsComponent } from './table-settings.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    TableSettingsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FuryCardModule,
    ScrollbarModule,
    AgGridModule,
    TableModule,
    TableSettingsRoutingModule,
    NgxSpinnerModule,
  ]
})
export class TableSettingsModule { }
