import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { AddEditNoteComponent } from "./add-edit-note/add-edit-note.component";
import { environment } from '../../../environments/environment';
import * as moment from "moment";

@Component({
  selector: 'fury-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  rowData: any = [];

  columnDefs: ColDef[] = [
    { field: 'id', hide: true },
    { field: 'title' },
    { headerName: "From", field: 'from_user', width: 150, suppressSizeToFit: true },
    { headerName: "To", field: 'to_user', width: 150, suppressSizeToFit: true },
    { headerName: "Closed", field: 'is_closed', width: 135, suppressSizeToFit: true },
    { headerName: "Create", field: 'created_at', width: 190, valueFormatter: this.dateFormatter, suppressSizeToFit: true },
  ];

  ngOnInit(): void {
    this.gedata();
  }

  gedata() {
    this.http
      .get(`${environment.apiUrl}notes`)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.rowData = response;
        },
        error: (error) => console.error(error),
      });
  }

  onCellClicked(e: CellClickedEvent): void {
    this.openDialog(e.data.id);
  }

  openDialog($id: Number) {
    this.dialog.open(AddEditNoteComponent, {
      data: { id: $id },
      disableClose: false,
      width: "700px",
      position: { top: "85px" }
    }).afterClosed().subscribe(result => {
      this.gedata();
    });
  }

  dateFormatter(params: any): string {
    return params.value ? moment(params.value).format('lll') : '';
  }

}
