import { Component } from '@angular/core';
import { CellClickedEvent } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { TableService } from '../../../core/table/table.service';
import { AddEditCustomerComponent } from "../add-edit-customer/add-edit-customer.component";

@Component({
  selector: 'fury-billers',
  templateUrl: './billers.component.html',
  styleUrls: ['./billers.component.scss']
})
export class BillersComponent {

  constructor(private dialog: MatDialog, private tableService: TableService) { }

  tableName: string = 'customers';
  dataRoute: string = 'billers';

  onCellClicked(e: CellClickedEvent): void {
    this.openDialog(e.data.id);
  }

  openDialog($id: Number) {
    this.dialog.open(AddEditCustomerComponent, {
      data: { id: $id },
      disableClose: false,
      width: "700px",
      position: { top: "85px" }
    }).afterClosed().subscribe(() => {
      this.tableService.refresh(true);
    });
  }

}
