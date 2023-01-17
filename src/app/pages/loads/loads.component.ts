// implements OnInit {
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CellClickedEvent, ColDef, GridOptions, GridApi } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { AddEditLoadComponent } from "./add-edit-load/add-edit-load.component";
import { environment } from '../../../environments/environment';
import * as moment from "moment";

@Component({
  selector: 'fury-drivers',
  templateUrl: './loads.component.html',
  styleUrls: ['./loads.component.scss']
})
export class LoadsComponent implements OnInit {

  constructor(private http: HttpClient,
    private dialog: MatDialog) { }

  gridApi: GridApi;
  gridOptions: GridOptions;
  loadData: any = [];
  backHaulData: any = [];
  tableTheme: string;
  result: string;
  searchDate: Date = new Date();
  panelOpenState = false;
  tripId: number;

  range = new FormGroup({
    start: new FormControl<Date | null>(new Date()),
    end: new FormControl<Date | null>(new Date()),
  });

  columnDefs: ColDef[] = [
    { field: 'id', hide: true },
    { headerName: "Trip", field: 'trip_id', width: 100, suppressSizeToFit: true },
    { headerName: "Type", field: 'type', width: 115, suppressSizeToFit: true },
    { headerName: "Sub-Type", field: 'subtype', width: 115, suppressSizeToFit: true },
    { headerName: "Dispatched", field: 'is_dispatched', width: 135, suppressSizeToFit: true },
    { headerName: "Pick-Up Date", field: 'pudate', width: 190, valueFormatter: this.dateFormatter, suppressSizeToFit: true },
    { headerName: "Delivery Date", field: 'deldate', width: 190, valueFormatter: this.dateFormatter, suppressSizeToFit: true },
    { headerName: "Linked Loads", field: 'has_linked_loads', width: 175, hide: true },
    { field: 'driver' },
    { field: 'shipper' },
    { field: 'receiver' },
  ];

  ngOnInit(): void {

    this.getLoads();
    this.getBackHauls();

  }

  getLoads(): any {
    this.http
      .get(`${environment.apiUrl}loads?type=Load&deldate=${moment(this.searchDate).format('YYYY-MM-DD')}&position=0`)
      .subscribe({
        next: (response) => {
          this.loadData = response;
        },
        error: (error) => console.error(error),
      });
  }

  getBackHauls(): any {
    this.http
      .get(`${environment.apiUrl}loads?type=Back-Haul&pudate=${moment(this.searchDate).format('YYYY-MM-DD')}&position=0`)
      .subscribe({
        next: (response) => {
          this.backHaulData = response;
        },
        error: (error) => console.error(error),
      });
  }

  onCellClicked(e: CellClickedEvent): void {
    this.openDialog(e.data.id);
  }

  openDialog($id: Number, $tripId: Number = 0, $type: string = null, $subtype: string = null) {

    this.dialog.open(AddEditLoadComponent, {
      data: { id: $id, tripId: $tripId, type: $type, subtype: $subtype },
      disableClose: false,
      width: "1200px",
      position: { top: "85px" }
    }).afterClosed().subscribe(result => {
      this.result = result;
      if (result) {
        console.log(result);
        this.openDialog(0, result.tripId, result.type, result.subtype)
      }
      if (this.tripId && this.tripId > 0) {
        this.searchByTrip()
      } else {
        this.getLoads();
        this.getBackHauls();
      }
    });
  }

  searchByTrip() {

    if (!this.tripId || this.tripId < 0)
      return;

    this.http
      .get(`${environment.apiUrl}loads?type=Load&trip_id=${this.tripId}&position=9999`)
      .subscribe({
        next: (response) => {
          this.loadData = response;
        },
        error: (error) => console.error(error),
      });

    this.http
      .get(`${environment.apiUrl}loads?type=Back-Haul&trip_id=${this.tripId}&position=9999`)
      .subscribe({
        next: (response) => {
          this.backHaulData = response;
        },
        error: (error) => console.error(error),
      });

  }

  onTableReady(params: any) {
    this.gridApi = params.api;
  }

  onDateChange($event: any) {
    this.tripId = null;
    if ($event) {
      this.getLoads();
      this.getBackHauls();
    }
  }

  dateFormatter(params: any): string {
    //, h:mm
    // ll
    //return params.value ? moment(params.value).format('MMM Do, h:mm a') : '';
    return params.value ? moment(params.value).format('lll') : '';
  }

}
