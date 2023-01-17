import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FuryCardModule } from '../../../@fury/shared/card/card.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { ScrollbarModule } from '../../../@fury/shared/scrollbar/scrollbar.module';
import { AgGridModule } from 'ag-grid-angular';
import { NgxSpinnerModule } from "ngx-spinner";
import { TableModule } from "../../core/table/table.module";
import { LoadsComponent } from './loads.component';
import { AddEditLoadComponent } from "./add-edit-load/add-edit-load.component";
import { LoadsRoutingModule } from './loads-routing.module';
import { BrokerageComponent } from './brokerage/brokerage.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    NgxSpinnerModule,
    FuryCardModule,
    ScrollbarModule,
    AgGridModule,
    TableModule,
    LoadsRoutingModule,
  ],
  declarations: [
    LoadsComponent,
    AddEditLoadComponent,
    BrokerageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoadsModule { }
