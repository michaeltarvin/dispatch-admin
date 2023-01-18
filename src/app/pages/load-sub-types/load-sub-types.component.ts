import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../environments/environment';
import { AddEditLoadSubTypeComponent } from "./add-edit-load-sub-type/add-edit-load-sub-type.component";

@Component({
  selector: 'fury-driver-types',
  templateUrl: './load-sub-types.component.html',
  styleUrls: ['./load-sub-types.component.scss']
})
export class LoadSubTypesComponent implements OnInit {

  constructor(private http: HttpClient,
    private dialog: MatDialog) { }

  rowData: any = [];
  result: string;

  columnDefs: ColDef[] = [
    { field: 'id' },
    { field: 'name' },
  ];

  ngOnInit(): void {
    this.gedata();
  }

  gedata() {
    this.http
      .get(`${environment.apiUrl}loadSubTypes`)
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

    this.dialog.open(AddEditLoadSubTypeComponent, {
      data: { id: $id },
      disableClose: false,
      width: "700px",
      position: { top: "85px" }
    }).afterClosed().subscribe(result => {
      this.result = result;
      this.gedata();
    });
  }

}
