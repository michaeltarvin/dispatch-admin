import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { environment } from '../../../environments/environment';
import * as moment from "moment";

@Component({
  selector: 'fury-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private http: HttpClient,
    private dialog: MatDialog) { }

  rowData: any = [];
  tableTheme: string;
  result: string;

  columnDefs: ColDef[] = [
    { field: 'id', width: 100, hide: true },
    { field: 'name', width: 200, rowDrag: true },
    { field: 'email', width: 350 },
    { headerName: "Created", field: 'created_at', width: 250, valueFormatter: this.dateFormatter },
    { headerName: "Last Updated", field: 'updated_at', width: 250, valueFormatter: this.dateFormatter },
  ];

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.http
      .get(`${environment.apiUrl}users`)
      .subscribe({
        next: (response) => {
          this.rowData = response;
        },
        error: (error) => console.error(error),
      });
  }

  onCellClicked(e: CellClickedEvent): void {
    console.log(e.data.id);
    this.openDialog(e.data.id);
  }

  openDialog($id: Number) {

    this.dialog.open(AddEditUserComponent, {
      data: { id: $id },
      disableClose: false,
      width: "1200px",
      position: { top: "85px" }
    }).afterClosed().subscribe(result => {
      this.result = result;
      this.getUsers();
    });
  }

  dateFormatter(params: any): string {
    return moment(params.value).format('MMMM Do YYYY, h:mm a');
  }

}
