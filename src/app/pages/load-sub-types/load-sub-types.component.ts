import { Component } from '@angular/core';
import { CellClickedEvent } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { TableService } from '../../core/table/table.service';
import { AddEditLoadSubTypeComponent } from "./add-edit-load-sub-type/add-edit-load-sub-type.component";

@Component({
  selector: 'fury-driver-types',
  templateUrl: './load-sub-types.component.html',
  styleUrls: ['./load-sub-types.component.scss']
})
export class LoadSubTypesComponent {

  constructor(private dialog: MatDialog, private tableService: TableService) { }

  tableName: string = 'load_sub_types';
  dataRoute: string = 'load_sub_types';

  onCellClicked(e: CellClickedEvent): void {
    this.openDialog(e.data.id);
  }

  openDialog($id: Number) {
    this.dialog.open(AddEditLoadSubTypeComponent, {
      data: { id: $id },
      disableClose: false,
      width: "700px",
      position: { top: "85px" }
    }).afterClosed().subscribe(() => {
      this.tableService.refresh(true);
    });
  }

}
