import { Component } from '@angular/core';
import { CellClickedEvent } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { AddEditDriverTypeComponent } from "./add-edit-driver-type/add-edit-driver-type.component";
import { TableService } from '../../core/table/table.service';

@Component({
  selector: 'fury-driver-types',
  templateUrl: './driver-types.component.html',
  styleUrls: ['./driver-types.component.scss']
})
export class DriverTypesComponent {

  constructor(private dialog: MatDialog, private tableService: TableService) { }

  tableName: string = 'driver_types';
  dataRoute: string = 'driver_types';

  onCellClicked(e: CellClickedEvent): void {
    this.openDialog(e.data.id);
  }

  openDialog($id: Number) {
    this.dialog.open(AddEditDriverTypeComponent, {
      data: { id: $id },
      disableClose: false,
      width: "700px",
      position: { top: "85px" }
    }).afterClosed().subscribe(() => {
      this.tableService.refresh(true);
    });
  }

}
