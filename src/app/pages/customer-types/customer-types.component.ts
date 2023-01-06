import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../environments/environment';
import { AddEditCustomerTypeComponent } from "./add-edit-customer-type/add-edit-customer-type.component";

@Component({
  selector: 'fury-customer-types',
  templateUrl: './customer-types.component.html',
  styleUrls: ['./customer-types.component.scss']
})
export class CustomerTypesComponent implements OnInit {

  constructor(private http: HttpClient,
    private dialog: MatDialog) { }

  rowData: any = [];
  result: string;

  columnDefs: ColDef[] = [
    { field: 'id' },
    { field: 'name' },
    { headerName: "Desc", field: 'description' },
    { headerName: "Shipper", field: 'is_shipper' },
    { headerName: "Biller", field: 'is_biller' },
    { headerName: "Receiver", field: 'is_receiver' },
  ];

  ngOnInit(): void {
    this.getCustomerTypes();
  }

  getCustomerTypes() {
    this.http
      .get(`${environment.apiUrl}customerTypes`)
      .subscribe({
        next: (response) => {
          this.rowData = response;
        },
        error: (error) => console.error(error),
      });
  }

  onCellClicked(e: CellClickedEvent): void {
    this.openDialog(e.data.id);
  }

  openDialog($id: Number) {

    this.dialog.open(AddEditCustomerTypeComponent, {
      data: { id: $id },
      disableClose: false,
      width: "700px",
      position: { top: "85px" }
    }).afterClosed().subscribe(result => {
      this.result = result;
      this.getCustomerTypes();
    });
  }

}
