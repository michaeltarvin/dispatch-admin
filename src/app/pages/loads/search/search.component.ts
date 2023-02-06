import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CellClickedEvent } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { AddEditLoadComponent } from "../add-edit-load/add-edit-load.component";
import * as moment from "moment";

@Component({
  selector: 'fury-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  @Output() dateChanged = new EventEmitter<string>();
  @Output() tripChanged = new EventEmitter<number>();
  result: string;
  searchDate: Date = new Date();
  tripId: number;

  ngOnInit(): void { }

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

      // if (this.tripId && this.tripId > 0) {
      //   this.searchByTrip()
      // } else {
      //   this.getLoads();
      // }
    });
  }

  searchByTrip() {

    if (!this.tripId || this.tripId < 0)
      return;
    this.tripChanged.emit(this.tripId);
  }

  onDateChange() {
    this.tripId = null;
    this.dateChanged.emit(moment(this.searchDate).format('YYYY-MM-DD'));
  }

}
