import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ColDef, GridOptions, GridApi, RowDragEndEvent } from 'ag-grid-community';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxMatDateFormats, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { LoadInterface } from "./load.interface";
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';

const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: 'MM/DD/YYYY HH:mm',
  },
  display: {
    dateInput: 'lll',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

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
  styleUrls: ['./add-edit-load.component.scss'],
  providers: [{ provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }],
})
export class AddEditLoadComponent implements OnInit {

  @ViewChild('picker') picker: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      id: number,
      tripId: number,
      type: string,
      subtype: string,
      is_brokerage: boolean,
      driverId: number
      shipperId: number,
      billerId: number,
      receiverId: number
    },
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
  public defaultTime = [new Date().getHours(), 0, 0]
  public loadTypes: string[] = ['Load', 'Back-Haul'];
  // public loadSubTypes: string[] = ['Pre-Load', 'Pick-Up', 'Stop'];
  loadSubTypesDB: any = [];
  loadData: any = [];
  linkedLoadData: LinkedLoadPosition[] = [];
  gridApi: GridApi;
  gridOptions: GridOptions;
  myDriverId: number = 97;
  errorMessage: string;

  load: LoadInterface;

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

    this.getLoadSubTypes();

    if (this.data.id > 0) {
      this.getLoad();
    } else {
      this.load = {
        is_dispatched: false,
        trip_id: this.data.tripId,
        type: this.data.type,
        subtype: this.data.subtype || '',
        is_brokerage: this.data.is_brokerage,
        has_linked_loads: false,
        driver_id: this.data.driverId > 0 ? this.data.driverId : null,
        // shipper_id: 0,
        // receiver_id: 0,
        // billto_id: 0,
        allmoney: 0,
        remaining_balance: 0,
        total: 0,
        misc: 0,
        rate: 0,
        lumper: 0,
        unload: 0,
        exten: 0,
        fuelpaid: 0,
        fuelsc: 0,
        detention: 0,
        layover: 0,
      } as LoadInterface;

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

  getLoadSubTypes() {
    this.http
      .get(`${environment.apiUrl}load_sub_types`)
      .subscribe({
        next: (response) => {
          this.loadSubTypesDB = response;
        },
        error: (error) => console.error(error),
      });
  }

  getDropdownData(type: string) {
    return this.http.get(`${environment.apiUrl}${type}`);
  }

  close() {
    this.dialogRef.close(null);
  }

  onBillerChange($event: CustomerList) {
    if ($event && this.load.billto_id !== $event.id) {
      this.load.billto_id = $event.id;
    }
  }

  onDriverChange($event: CustomerList) {
    if ($event && this.load.driver_id !== $event.id) {
      this.load.driver_id = $event.id;
    }
  }

  onShipperChange($event: CustomerList) {
    if ($event && this.load.shipper_id !== $event.id) {
      this.load.shipper_id = $event.id;
    }
  }

  onReceiverChange($event: CustomerList) {
    if ($event && this.load.receiver_id !== $event.id) {
      this.load.receiver_id = $event.id;
    }
  }

  save(closeDialog: boolean = true) {
    this.errorMessage = null;

    if (this.dateControl.value) {
      this.load.pudate = moment(this.dateControl.value).format('YYYY-MM-DDTHH:mm:00.000000Z');
    }
    if (this.delDateControl.value) {
      this.load.deldate = moment(this.delDateControl.value).format('YYYY-MM-DDTHH:mm:00.000000Z');
    }

    if (this.load.id > 0) {
      this.http
        .patch(`${environment.apiUrl}loads/${this.data.id}`, this.load)
        .subscribe({
          next: (response) => {
            console.log(response);
            if (closeDialog) {
              this.dialogRef.close(null);
            }
          },
          error: (error) => {
            console.error(error.error.message);
            this.errorMessage = error.error.message;
          },
        });
    } else {
      this.http
        .post(`${environment.apiUrl}loads`, this.load)
        .subscribe({
          next: (response) => {
            console.log(response);
            if (closeDialog) {
              this.dialogRef.close(null);
            }
          },
          error: (error) => {
            console.error(error.error.message);
            this.errorMessage = error.error.message;
          },
        });
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
      Number(this.load.exten) +
      Number(this.load.fuelpaid);
    this.load.total = total;
  }

  getAllMoney() {
    var allmoney = this.getBaseAmount() +
      Number(this.load.rate) +
      Number(this.load.fuelsc);
    this.load.allmoney = allmoney;
    return allmoney;
  }

  getBaseAmount() {
    var baseAmount =
      Number(this.load.lumper) +
      Number(this.load.unload) +
      Number(this.load.misc) +
      Number(this.load.layover) +
      Number(this.load.detention);
    return baseAmount;
  }

  canAddLinkedLoad() {
    return !(this.load && this.load.id > 0);
  }

  addLinkedLoad(subtype: string) {
    this.save(false);
    const config =
    {
      tripId: this.load.trip_id,
      type: this.load.type,
      subtype: subtype,
      driverId: this.load.driver_id,
      shipperId: this.load.shipper_id,
      billerId: this.load.billto_id,
      receiverId: this.load.receiver_id
    };
    console.log(config)
    this.dialogRef.close(config);
  }

  dateFormatter(params: any): string {
    return moment(params.value).format('ll');
  }

  onRowDragEnd(e: RowDragEndEvent): void {
    this.linkedLoadData = [];
    let d = e.api.getRenderedNodes();
    for (let i = 0; i < d.length; i++) {
      this.linkedLoadData.push({ loadId: d[i].data.id, position: i })
    }
  }

  isLoadValidForSave(): boolean {
    return !(this.load.type != '');
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
