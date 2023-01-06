// implements OnInit {
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
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

  loadData: any = [];
  backHaulData: any = [];
  tableTheme: string;
  result: string;
  searchDate: Date = new Date();
  panelOpenState = false;

  range = new FormGroup({
    start: new FormControl<Date | null>(new Date()),
    end: new FormControl<Date | null>(new Date()),
  });

  columnDefs: ColDef[] = [
    { field: 'id', hide: true },
    { headerName: "Trip", field: 'trip_id', width: 100 },
    { headerName: "Type", field: 'type', width: 115 },
    { headerName: "Sub-Type", field: 'subtype', width: 115 },
    { headerName: "Dispatched", field: 'is_dispatched', width: 135 },
    {
      headerName: "Pick-Up", field: 'pudate', width: 175, cellRenderer: (data: any) => {
        return moment(data.pudate).format('ll')
      }
    },
    {
      headerName: "Delivery", field: 'deldate', width: 175, cellRenderer: (data: any) => {
        return moment(data.deldate).format('ll')
      }
    },
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
      .get(`${environment.apiUrl}loads?type=Load&deldate=${moment(this.searchDate).format('YYYY-MM-DD')}`)
      .subscribe({
        next: (response) => {
          //console.log(response);
          this.loadData = response;
        },
        error: (error) => console.error(error),
      });
  }

  getBackHauls(): any {
    this.http
      .get(`${environment.apiUrl}loads?type=Back-Haul&pudate=${moment(this.searchDate).format('YYYY-MM-DD')}`)
      .subscribe({
        next: (response) => {
          //console.log(response);
          this.backHaulData = response;
        },
        error: (error) => console.error(error),
      });
  }


  // getLoads(type: string): any {
  //   this.http
  //     .get(`${environment.apiUrl}loads?type=${type}`)
  //     .subscribe({
  //       next: (response) => {
  //         return response;
  //       },
  //       error: (error) => console.error(error),
  //     });
  // }

  onCellClicked(e: CellClickedEvent): void {
    console.log(e.data.id);
    this.openDialog(e.data.id);
  }

  openDialog($id: Number) {

    this.dialog.open(AddEditLoadComponent, {
      data: { id: $id },
      disableClose: false,
      width: "1200px",
      position: { top: "85px" }
    }).afterClosed().subscribe(result => {
      this.result = result;
      this.getLoads();
      this.getBackHauls();
    });
  }

  onDateChange($event) {
    this.getLoads();
    this.getBackHauls();
  }

}
