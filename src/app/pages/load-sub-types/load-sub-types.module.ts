import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { FuryCardModule } from '../../../@fury/shared/card/card.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { ScrollbarModule } from '../../../@fury/shared/scrollbar/scrollbar.module';
import { AgGridModule } from 'ag-grid-angular';
import { TableModule } from "../../core/table/table.module";
import { LoadSubTypesComponent } from './load-sub-types.component';
import { LoadSubTypesRoutingModule } from './load-sub-types-routing.module';
import { AddEditLoadSubTypeComponent } from './add-edit-load-sub-type/add-edit-load-sub-type.component';

@NgModule({
  declarations: [
    LoadSubTypesComponent,
    AddEditLoadSubTypeComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BreadcrumbsModule,
    FuryCardModule,
    ScrollbarModule,
    AgGridModule,
    TableModule,
    LoadSubTypesRoutingModule
  ],
})
export class LoadSubTypesModule { }
