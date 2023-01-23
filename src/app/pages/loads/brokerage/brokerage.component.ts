import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { AddEditLoadComponent } from "../add-edit-load/add-edit-load.component";
import { environment } from '../../../../environments/environment';
import * as moment from "moment";

@Component({
  selector: 'fury-brokerage',
  templateUrl: './brokerage.component.html',
  styleUrls: ['./brokerage.component.scss']
})
export class BrokerageComponent implements OnInit {

  constructor(private http: HttpClient,
    private dialog: MatDialog) { }

  loadData: any = [];
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
    { headerName: "Trip", field: 'trip_id', width: 100 },
    { headerName: "Type", field: 'type', width: 115 },
    { headerName: "Sub-Type", field: 'subtype', width: 133 },
    { headerName: "Dispatched", field: 'is_dispatched', width: 140 },
    { headerName: "Pick-Up Date", field: 'pudate', width: 205, valueFormatter: this.dateFormatter },
    { headerName: "Delivery Date", field: 'deldate', width: 205, valueFormatter: this.dateFormatter },
    { field: 'driver' },
    { field: 'shipper' },
    { field: 'receiver' },
  ];

  ngOnInit(): void {
    this.getLoads();
  }

  getLoads(): any {
    this.http
      .get(`${environment.apiUrl}loads?type=Load&is_brokerage=1&pudate=${moment(this.searchDate).format('YYYY-MM-DD')}`)
      .subscribe({
        next: (response) => {
          this.loadData = response;
        },
        error: (error) => console.error(error),
      });
  }

  onCellClicked(e: CellClickedEvent): void {
    this.openDialog(e.data.id,
      0,
      null,
      null,
      e.data.driver_id,
      e.data.shipper_id,
      e.data.billto_id,
      e.data.receiver_id);
  }

  openDialog($id: Number,
    $tripId: Number = 0,
    $type: string = null,
    $subtype: string = null,
    $driverId: number = 0,
    $shipperId: number = 0,
    $billerId: number = 0,
    $receiverId: number = 0
  ) {

    this.dialog.open(AddEditLoadComponent, {
      data: {
        id: $id,
        tripId: $tripId,
        type: $type,
        subtype: $subtype,
        driverId: $driverId,
        shipperId: $shipperId,
        billerId: $billerId,
        receiverId: $receiverId
      },
      disableClose: false,
      width: "1200px",
      position: { top: "85px" }
    }).afterClosed().subscribe(result => {
      this.result = result;
      if (result) {
        console.log(result);
        this.openDialog(0,
          result.tripId,
          result.type,
          result.subtype,
          result.driverId,
          0,
          0,
          0)
      }
      if (this.tripId && this.tripId > 0) {
        this.searchByTrip()
      } else {
        this.getLoads();
      }
    });
  }

  searchByTrip() {

    if (!this.tripId || this.tripId < 0)
      return;

    this.http
      .get(`${environment.apiUrl}loads?type=Load&is_brokerage=1&trip_id=${this.tripId}`)
      .subscribe({
        next: (response) => {
          this.loadData = response;
        },
        error: (error) => console.error(error),
      });

  }

  onDateChange($event: any) {
    this.tripId = null;
    if ($event) {
      this.getLoads();
    }
  }

  dateFormatter(params: any): string {
    return moment(params.value).format('lll');
  }

}
