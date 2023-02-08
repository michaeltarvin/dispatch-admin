import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CellClickedEvent, GridOptions, GridApi } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { AddEditLoadComponent } from "./add-edit-load/add-edit-load.component";
import { TableService } from '../../core/table/table.service';
import { environment } from '../../../environments/environment';
import * as moment from "moment";

@Component({
  selector: 'fury-drivers',
  templateUrl: './loads.component.html',
  styleUrls: ['./loads.component.scss']
})
export class LoadsComponent implements OnInit {

  constructor(private http: HttpClient,
    private dialog: MatDialog,
    private tableService: TableService) { }

  tableName: string = 'load';
  gridLoadApi: GridApi;
  gridBackApi: GridApi;
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
          // this.tableService.resize();
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
          // this.tableService.resize();
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
    }).afterClosed().subscribe(result => {
      this.result = result;
      if (result) {
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
          this.gridLoadApi.sizeColumnsToFit({
            defaultMinWidth: 200,
          });
        },
        error: (error) => console.error(error),
      });

    this.http
      .get(`${environment.apiUrl}loads?type=Back-Haul&trip_id=${this.tripId}&position=9999`)
      .subscribe({
        next: (response) => {
          this.backHaulData = response;
          this.gridBackApi.sizeColumnsToFit({
            defaultMinWidth: 200,
          });
        },
        error: (error) => console.error(error),
      });

  }

  // sizeColumnsToFit(api: GridApi) {
  //   api.sizeColumnsToFit({
  //     defaultMinWidth: 200,
  //   });
  // }

  onTable1Ready(params: any) {
    this.gridLoadApi = params.api;
  }

  onTable2Ready(params: any) {
    this.gridBackApi = params.api;
  }

  onDateChange($event: any) {
    this.tripId = null;
    if ($event) {
      this.getLoads();
      this.getBackHauls();
    }
  }

}
