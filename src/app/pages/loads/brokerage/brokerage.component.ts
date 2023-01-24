import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CellClickedEvent } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { AddEditLoadComponent } from "../add-edit-load/add-edit-load.component";
import { TableService } from '../../../core/table/table.service';
import { environment } from '../../../../environments/environment';
import * as moment from "moment";

@Component({
  selector: 'fury-brokerage',
  templateUrl: './brokerage.component.html',
  styleUrls: ['./brokerage.component.scss']
})
export class BrokerageComponent implements OnInit {

  constructor(private http: HttpClient,
    private tableService: TableService,
    private dialog: MatDialog) { }

  tableName: string = 'load';
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

  ngOnInit(): void {
    this.getLoads();
  }

  getLoads(): any {
    this.http
      .get(`${environment.apiUrl}loads?type=Load&is_brokerage=1&pudate=${moment(this.searchDate).format('YYYY-MM-DD')}`)
      .subscribe({
        next: (response) => {
          this.loadData = response;
          this.tableService.refresh(true);
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

}
