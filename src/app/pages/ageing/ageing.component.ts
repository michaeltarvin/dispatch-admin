import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { environment } from '../../../environments/environment';
import * as moment from "moment";

@Component({
  selector: 'fury-ageing',
  templateUrl: './ageing.component.html',
  styleUrls: ['./ageing.component.scss']
})
export class AgeingComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAgeingData();
  }

  rowData: any = [];
  tableTheme: string;
  result: string;

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'Load ID', hide: true },
    { field: 'trip_id', headerName: 'Trip', width: 100 },
    { field: 'days_past_due', headerName: 'Days Past Due', width: 150 },
    { field: 'type', headerName: 'Type', width: 115 },
    // { field: 'pudate', headerName: "Pick-Up Date", width: 150, valueFormatter: this.dateFormatter },
    { field: 'deldate', headerName: "Delivery Date", width: 150, valueFormatter: this.dateFormatter },
    { field: 'total', headerName: 'Total $', width: 115, valueFormatter: this.moneyFormatter },
    { field: 'allmoney', headerName: 'All $', width: 115, valueFormatter: this.moneyFormatter },
    { field: 'billed', headerName: 'Billed', width: 175 },
    { field: 'shipper', headerName: 'Shipper', width: 175 },
    { field: 'receiver', headerName: 'Receiver', width: 175 },
    { field: 'driver', headerName: 'Driver', width: 175 },
  ];

  getAgeingData() {
    this.http
      .get(`${environment.apiUrl}ageing`)
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
    console.log($id);
  }

  dateFormatter(params: any): string {
    return moment(params.value).format('ll');
  }

  moneyFormatter(params: any): string {
    return `$${params.value}`
  }

}
