import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ColDef, GridOptions, GridApi, RowDragEndEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadInterface } from "./load.interface";
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';

export class CustomerList {
  id: number;
  name: string;
  alias: string;
}

export class LinkedLoadPosition {
  loadId: number;
  position: number;
}

@Component({
  selector: 'fury-add-edit-load',
  templateUrl: './add-edit-load.component.html',
  styleUrls: ['./add-edit-load.component.scss']
})
export class AddEditLoadComponent implements OnInit {

  @ViewChild('picker') picker: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number, tripId: number, type: string, subtype: string, is_brokerage: boolean },
    public dialogRef: MatDialogRef<AddEditLoadComponent>,
    private spinner: NgxSpinnerService,
    private http: HttpClient) {
  }

  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public stepHour = 1;
  public stepMinute = 5;
  public dateControl = new FormControl(null, [Validators.required]);
  public delDateControl = new FormControl(null, [Validators.required]);
  public loadTypes: string[] = ['Load', 'Back-Haul'];
  public loadSubTypes: string[] = ['Pre-Load', 'Pick-Up', 'Stop'];
  loadData: any = [];
  linkedLoadData: LinkedLoadPosition[] = [];
  gridApi: GridApi;
  gridOptions: GridOptions;

  load: LoadInterface;

  shippers: any = [];
  shipperControl = new FormControl(new CustomerList());
  shipperOptions: Observable<string[]>;

  billers: any = [];
  billersControl = new FormControl(new CustomerList());
  billersOptions: Observable<string[]>;

  receivers: any = [];
  receiversControl = new FormControl(new CustomerList());
  receiversOptions: Observable<string[]>;

  drivers: any = [];
  driversControl = new FormControl(new CustomerList());
  driversOptions: Observable<string[]>;

  columnDefs: ColDef[] = [
    { headerName: "Order", field: 'linked_load_position', width: 115, rowDrag: true, suppressSizeToFit: true },
    { headerName: "Load ID", field: 'id', width: 115 },
    { headerName: "Sub-Type", field: 'subtype', width: 115, suppressSizeToFit: true },
    { headerName: "Pick-Up Date", field: 'pudate', width: 175, valueFormatter: this.dateFormatter, suppressSizeToFit: true },
    { headerName: "Delivery Date", field: 'deldate', width: 175, valueFormatter: this.dateFormatter, suppressSizeToFit: true },
    { field: 'driver', width: 175, suppressSizeToFit: true },
    { field: 'shipper', width: 175, suppressSizeToFit: true },
    { field: 'receiver', width: 175, suppressSizeToFit: true },
  ];

  ngOnInit(): void {

    this.setupCustomers();

    if (this.data.id > 0) {
      this.getLoad();
    } else {
      this.load = {
        is_dispatched: false,
        trip_id: this.data.tripId,
        type: this.data.type,
        subtype: this.data.subtype,
        is_brokerage: this.data.is_brokerage,
        has_linked_loads: false
      } as LoadInterface;
      console.log(this.load);

      if (this.load.trip_id > 0) {
        this.getNextPosition();
      }
    }
  }

  getNextPosition() {
    this.http
      .get<LoadInterface[]>(`${environment.apiUrl}loads?trip_id=${this.load.trip_id}`)
      .subscribe({
        next: (response) => {
          this.load.linked_load_position = response.length;
        },
        error: (error) => console.error(error),
      });
  }

  getLoad() {
    this.http
      .get(`${environment.apiUrl}loads/${this.data.id}`)
      .subscribe({
        next: (response) => {
          this.load = response as LoadInterface;
          console.log(this.load);
          this.shipperControl.setValue(this.getCustomerFromArray(this.load.shipper_id, this.shippers));
          this.billersControl.setValue(this.getCustomerFromArray(this.load.billto_id, this.billers));
          this.receiversControl.setValue(this.getCustomerFromArray(this.load.receiver_id, this.receivers));
          this.driversControl.setValue(this.getCustomerFromArray(this.load.driver_id, this.drivers));
          this.dateControl.setValue(moment(this.load.pudate).toDate());
          this.delDateControl.setValue(moment(this.load.deldate).toDate());

          if (this.load.has_linked_loads === true) {
            this.http
              .get(`${environment.apiUrl}loads?trip_id=${this.load.trip_id}&position=9999`)
              .subscribe({
                next: (response) => {
                  this.loadData = response;
                },
                error: (error) => console.error(error),
              });
          }

        },
        error: (error) => console.error(error),
      });
  }

  getCustomerFromArray(id: number, list: CustomerList[]): any {
    return list.find((obj) => {
      return obj.id === id;
    });
  }

  getDropdownData(type: string) {
    return this.http.get(`${environment.apiUrl}${type}`);
  }

  close() {
    this.dialogRef.close(null);
  }

  save(closeDialog: boolean = true) {

    //TODO find a better way to handle forms
    if (this.load.driver_id !== this.driversControl.value.id) {
      this.load.driver_id = this.driversControl.value.id
    }

    if (this.load.shipper_id !== this.shipperControl.value.id) {
      this.load.shipper_id = this.shipperControl.value.id
    }

    if (this.load.billto_id !== this.billersControl.value.id) {
      this.load.billto_id = this.billersControl.value.id
    }

    if (this.load.receiver_id !== this.receiversControl.value.id) {
      this.load.receiver_id = this.receiversControl.value.id
    }

    this.load.pudate = moment(this.dateControl.value).format('YYYY-MM-DDTHH:mm:00.000000Z');
    this.load.deldate = moment(this.delDateControl.value).format('YYYY-MM-DDTHH:mm:00.000000Z');

    if (this.load.id > 0) {
      this.http
        .patch(`${environment.apiUrl}loads/${this.data.id}`, this.load)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => console.error(error),
        });
    } else {
      this.http
        .post(`${environment.apiUrl}loads`, this.load)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => console.error(error),
        });
    }

    if (closeDialog) {
      this.dialogRef.close(null);
    }
  }

  dispatch() {
    if (this.load.is_dispatched) {
      return;
    }
    this.load.is_dispatched = true;
    this.save();
  }

  getTotal() {
    var total = this.getBaseAmount() +
      Number(this.load.exten || 0) +
      Number(this.load.fuelpaid || 0);
    this.load.total = total || 0;
  }

  getAllMoney() {
    var allmoney = this.getBaseAmount() +
      Number(this.load.rate || 0) +
      Number(this.load.fuelsc || 0);
    this.load.allmoney = allmoney || 0;
    return allmoney || 0;
  }

  getBaseAmount() {
    var baseAmount =
      Number(this.load.lumper) +
      Number(this.load.unload) +
      Number(this.load.misc) +
      Number(this.load.layover) +
      Number(this.load.detention);
    return baseAmount || 0;
  }

  displayFn(customer: CustomerList): string {
    return customer && customer.name ? customer.name : '';
  }

  setupCustomers() {

    this.getDropdownData('shippers-list')
      .subscribe({
        next: (response) => {
          this.shippers = response as CustomerList[];
          this.shipperOptions = this.shipperControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filterShippers(value || '')),
          );
        },
        error: (error) => console.error(error),
      });

    this.getDropdownData('receivers-list')
      .subscribe({
        next: (response) => {
          this.receivers = response as CustomerList[];
          this.receiversOptions = this.receiversControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filterReceivers(value || '')),
          );
        },
        error: (error) => console.error(error),
      });

    this.getDropdownData('billers-list')
      .subscribe({
        next: (response) => {
          this.billers = response as CustomerList[];
          this.billersOptions = this.billersControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filterBillers(value || '')),
          );
        },
        error: (error) => console.error(error),
      });

    this.getDropdownData('drivers-list')
      .subscribe({
        next: (response) => {
          this.drivers = response as CustomerList[];
          this.driversOptions = this.driversControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filterDrivers(value || '')),
          );
        },
        error: (error) => console.error(error),
      });
  }

  private _filterShippers(value: any): string[] {

    let filterValue = '';
    if ((typeof value) == 'string') {
      filterValue = value.toLowerCase();
    }

    return this.shippers.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private _filterBillers(value: any): string[] {

    let filterValue = '';
    if ((typeof value) == 'string') {
      filterValue = value.toLowerCase();
    }

    return this.billers.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private _filterReceivers(value: any): string[] {

    let filterValue = '';
    if ((typeof value) == 'string') {
      filterValue = value.toLowerCase();
    }

    return this.receivers.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private _filterDrivers(value: any): string[] {

    let filterValue = '';
    if ((typeof value) == 'string') {
      filterValue = value.toLowerCase();
    }

    return this.drivers.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  canAddLinkedLoad() {
    return !(this.load && this.load.id > 0);
  }

  addLinkedLoad(subtype: string) {
    this.save(false);
    this.dialogRef.close({ tripId: this.load.trip_id, type: this.load.type, subtype: subtype });
  }

  dateFormatter(params: any): string {
    return moment(params.value).format('ll');
  }

  onRowDragEnd(e: RowDragEndEvent): void {
    this.linkedLoadData = [];
    let d = e.api.getRenderedNodes();
    for (let i = 0; i < d.length; i++) {
      // console.log(d[i].data);
      this.linkedLoadData.push({ loadId: d[i].data.id, position: i })
    }
    // console.log(this.linkedLoadData);
  }

  savePositions() {
    if (!this.linkedLoadData || this.linkedLoadData.length == 0) return;
    /** spinner starts on init */
    this.spinner.show(undefined, {
      type: 'ball-spin',
      size: 'large',
      bdColor: 'rgba(100,149,237, .8)',
      color: 'white',
      fullScreen: false,
    });

    for (let i = 0; i < this.linkedLoadData.length; i++) {
      this.http
        .patch(`${environment.apiUrl}loads/${this.linkedLoadData[i].loadId}`, { linked_load_position: this.linkedLoadData[i].position })
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => console.error(error),
        });
    }

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }

}
