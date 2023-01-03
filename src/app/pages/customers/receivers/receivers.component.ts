import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { AddEditCustomerComponent } from "../add-edit-customer/add-edit-customer.component";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'fury-billers',
  templateUrl: './receivers.component.html',
  styleUrls: ['./receivers.component.scss']
})
export class ReceiversComponent implements OnInit {

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
      .get(`${environment.apiUrl}receivers`)
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
