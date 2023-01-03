import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';
import { AddEditCustomerComponent } from "../add-edit-customer/add-edit-customer.component";

@Component({
  selector: 'fury-billers',
  templateUrl: './shippers.component.html',
  styleUrls: ['./shippers.component.scss']
})
export class ShippersComponent implements OnInit {

  constructor(private http: HttpClient,
    private dialog: MatDialog) { }

  rowData: any = [];
  tableTheme: string;

  columnDefs: ColDef[] = [
    { field: 'id', hide: true },
    { field: 'name' },
    { field: 'alias' },
    { headerName: "Type", field: 'type_name' },
    { field: 'email' },
    { field: 'address' },
    { field: 'city' },
    { field: 'state' },
    { field: 'zip' },
    { field: 'cell' },
    { headerName: "Active", field: 'is_active' },
  ];

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.http
      .get(`${environment.apiUrl}shippers`)
      .subscribe({
        next: (response) => {
          this.rowData = response;
        },
        error: (error) => console.error(error),
      });
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log(e.data.id);
    this.openDialog(e.data.id);
  }

  openDialog($id: Number) {
    this.dialog.open(AddEditCustomerComponent, {
      data: { id: $id },
      disableClose: false,
      width: "1200px",
      position: { top: "85px" }
    }).afterClosed().subscribe(result => {
      console.log(result);
      this.getCustomers();
    });
  }

}
