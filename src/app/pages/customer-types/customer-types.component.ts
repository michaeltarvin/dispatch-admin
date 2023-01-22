import { Component } from '@angular/core';
import { CellClickedEvent } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { TableService } from '../../core/table/table.service';
import { AddEditCustomerTypeComponent } from "./add-edit-customer-type/add-edit-customer-type.component";

@Component({
  selector: 'fury-customer-types',
  templateUrl: './customer-types.component.html',
  styleUrls: ['./customer-types.component.scss']
})
export class CustomerTypesComponent {

  constructor(private dialog: MatDialog, private tableService: TableService) { }

  tableName: string = 'customer_types';
  dataRoute: string = 'customer_types';

  onCellClicked(e: CellClickedEvent): void {
    this.openDialog(e.data.id);
  }

  openDialog($id: Number) {
    this.dialog.open(AddEditCustomerTypeComponent, {
      data: { id: $id },
      disableClose: false,
      width: "700px",
      position: { top: "85px" }
    }).afterClosed().subscribe(() => {
      this.tableService.refresh(true);
    });
  }

}
