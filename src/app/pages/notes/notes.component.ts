import { Component } from '@angular/core';
import { CellClickedEvent } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { AddEditNoteComponent } from "./add-edit-note/add-edit-note.component";
import { TableService } from '../../core/table/table.service';

@Component({
  selector: 'fury-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {

  constructor(private dialog: MatDialog, private tableService: TableService) { }

  tableName: string = 'notes';

  onCellClicked(e: CellClickedEvent): void {
    this.openDialog(e.data.id);
  }

  openDialog($id: Number) {
    this.dialog.open(AddEditNoteComponent, {
      data: { id: $id },
      disableClose: false,
      width: "700px",
    }).afterClosed().subscribe(() => {
      this.tableService.refresh(true);
    });
  }

}
