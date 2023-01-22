import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FuryCardModule } from '../../../@fury/shared/card/card.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { ScrollbarModule } from '../../../@fury/shared/scrollbar/scrollbar.module';
import { AgGridModule } from 'ag-grid-angular';
import { TableModule } from "../../core/table/table.module";
import { AgeingRoutingModule } from './ageing-routing.module';
import { AgeingComponent } from '../ageing/ageing.component';

@NgModule({
  imports: [
    CommonModule,
    AgeingRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FuryCardModule,
    ScrollbarModule,
    AgGridModule,
    TableModule,
  ],
  declarations: [
    AgeingComponent
  ],
})
export class AgeingModule { }
