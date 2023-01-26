import { Component } from '@angular/core';
import { CellClickedEvent } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { TableService } from '../../core/table/table.service';
import { AddEditDriverComponent } from "./add-edit-driver/add-edit-driver.component";

@Component({
  selector: 'fury-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent {

  constructor(private dialog: MatDialog, private tableService: TableService) { }

  tableName: string = 'drivers';
  dataRoute: string = 'drivers';

  onCellClicked(e: CellClickedEvent): void {
    this.openDialog(e.data.id);
  }

  openDialog($id: Number) {
    this.dialog.open(AddEditDriverComponent, {
      data: { id: $id },
      disableClose: false,
      width: "1200px",
      position: { top: "85px" }
    }).afterClosed().subscribe(() => {
      this.tableService.refresh(true);
    });
  }

}
