import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../environments/environment';
import { AddEditDriverTypeComponent } from "./add-edit-driver-type/add-edit-driver-type.component";

@Component({
  selector: 'fury-driver-types',
  templateUrl: './driver-types.component.html',
  styleUrls: ['./driver-types.component.scss']
})
export class DriverTypesComponent implements OnInit {

  constructor(private http: HttpClient,
    private dialog: MatDialog) { }

  rowData: any = [];
  result: string;

  columnDefs: ColDef[] = [
    { field: 'id' },
    { field: 'name' },
    { headerName: "Desc", field: 'description' }
  ];

  ngOnInit(): void {
    this.getDriverTypes();
  }

  getDriverTypes() {
    this.http
      .get(`${environment.apiUrl}driverTypes`)
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

    this.dialog.open(AddEditDriverTypeComponent, {
      data: { id: $id },
      disableClose: false,
      width: "700px",
      position: { top: "85px" }
    }).afterClosed().subscribe(result => {
      this.result = result;
      this.getDriverTypes();
    });
  }

}
