import { Component } from '@angular/core';
import { CellClickedEvent } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { TableService } from '../../../core/table/table.service';
import { AddEditCustomerComponent } from "../add-edit-customer/add-edit-customer.component";

@Component({
  selector: 'fury-billers',
  templateUrl: './receivers.component.html',
  styleUrls: ['./receivers.component.scss']
})
export class ReceiversComponent {

  constructor(private dialog: MatDialog, private tableService: TableService) { }

  tableName: string = 'customers';
  dataRoute: string = 'receivers';

  onCellClicked(e: CellClickedEvent): void {
    this.openDialog(e.data.id);
  }

  openDialog($id: Number) {
    this.dialog.open(AddEditCustomerComponent, {
      data: { id: $id },
      disableClose: false,
      width: "1200px",
    }).afterClosed().subscribe(() => {
      this.tableService.refresh(true);
    });
  }

}
