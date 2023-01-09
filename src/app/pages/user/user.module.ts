import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { FuryCardModule } from '../../../@fury/shared/card/card.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { ScrollbarModule } from '../../../@fury/shared/scrollbar/scrollbar.module';
import { AgGridModule } from 'ag-grid-angular';
import { TableModule } from "../../core/table/table.module";
import { UserRoutingModule } from './user-routing.module';
import { UsersComponent } from './users.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
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
  ],
  declarations: [
    UsersComponent,
    AddEditUserComponent
  ],
})
export class UserModule { }
