import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { FuryCardModule } from '../../../@fury/shared/card/card.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { ScrollbarModule } from '../../../@fury/shared/scrollbar/scrollbar.module';
import { AgGridModule } from 'ag-grid-angular';
import { TableModule } from "../../core/table/table.module";
import { NotesComponent } from './notes.component';
import { NotesRoutingModule } from './notes-routing.module';
import { AddEditNoteComponent } from './add-edit-note/add-edit-note.component';

@NgModule({
  declarations: [
    NotesComponent,
    AddEditNoteComponent,

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
    NotesRoutingModule
  ],
})
export class NotesModule { }
