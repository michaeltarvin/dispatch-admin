import { Component } from '@angular/core';
import { CellClickedEvent } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { TableService } from '../../core/table/table.service';

@Component({
  selector: 'fury-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  constructor(private dialog: MatDialog,
    private tableService: TableService) {
  }

  tableName: string = 'users';

  onCellClicked(e: CellClickedEvent): void {
    this.openDialog(e.data.id);
  }

  openDialog($id: Number) {
    this.dialog.open(AddEditUserComponent, {
      data: { id: $id },
      disableClose: false,
      width: "700px",
    }).afterClosed().subscribe(() => {
      this.tableService.refresh(true);
    });
  }

}
