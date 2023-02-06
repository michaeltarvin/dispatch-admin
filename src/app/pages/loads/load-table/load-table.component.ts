
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CellClickedEvent } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { AddEditLoadComponent } from "../add-edit-load/add-edit-load.component";
import { TableService } from '../../../core/table/table.service';
import { LoadsService } from '../loads.service';
import * as moment from "moment";

@Component({
  selector: 'fury-load-table',
  templateUrl: './load-table.component.html',
  styleUrls: ['./load-table.component.scss']
})
export class LoadTableComponent implements OnInit, OnDestroy {

  constructor(private tableService: TableService,
    private loadsService: LoadsService,
    private dialog: MatDialog) {

    this.loadsService.tripChanged$.subscribe(id => this.searchByTrip(id));
    this.loadsService.dateChanged$.subscribe(date => this.onDateChange(date));

  }

  @Input() name: string;
  @Input() loadType: string = 'Load';
  @Input() isBrokerage: boolean = false;

  tableName: string = 'load';
  result: string;
  searchDateString: string;
  tripId: number;

  ngOnInit(): void {
    const url = this.getUrlForDate(moment(new Date()).format('YYYY-MM-DD'));
    this.tableService.dataRouteChange(url);
  }

  ngOnDestroy() {
    // this.loadsService.tripChanged$.unsubscribe();
    // this.loadsService.dateChanged$.unsubscribe();
  }

  getUrlForDate(date: string): string {
    return `loads?type=${this.loadType}&is_brokerage=${this.isBrokerage ? 1 : 0}&pudate=${date}`;
  }

  getUrlForTrip(id: number): string {
    return `loads?type=${this.loadType}&is_brokerage=${this.isBrokerage ? 1 : 0}&trip_id=${id}`;
  }

  searchByTrip($event: number) {

    if (!$event || $event < 0)
      return;

    this.tripId = $event;
    const url = this.getUrlForTrip(this.tripId);
    this.tableService.dataRouteChange(url);
  }

  onDateChange($event: any) {
    this.searchDateString = $event;
    this.tripId = null;
    const url = this.getUrlForDate(this.searchDateString);
    this.tableService.dataRouteChange(url);
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
        this.searchByTrip(this.tripId)
      } else {
        this.onDateChange(this.searchDateString);
      }
    });
  }

}
