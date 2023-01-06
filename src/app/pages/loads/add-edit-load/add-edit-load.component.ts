import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadInterface } from "./load.interface";
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';

export class CustomerList {
  id: number;
  name: string;
  alias: string;
}

@Component({
  selector: 'fury-add-edit-load',
  templateUrl: './add-edit-load.component.html',
  styleUrls: ['./add-edit-load.component.scss']
})
export class AddEditLoadComponent implements OnInit {

  @ViewChild('picker') picker: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialogRef: MatDialogRef<AddEditLoadComponent>,
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


  ngOnInit(): void {

    this.setupCustomers();

    if (this.data.id > 0) {
      this.getLoad();
    } else {
      this.load = { is_dispatched: false } as LoadInterface;
    }

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
    this.dialogRef.close('close');
  }

  save() {

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

    this.dialogRef.close('saved');
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
    //console.log('getTotal()', total || 0);
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
        },
        error: (error) => console.error(error),
      });

    this.getDropdownData('receivers-list')
      .subscribe({
        next: (response) => {
          this.receivers = response as CustomerList[];
        },
        error: (error) => console.error(error),
      });

    this.getDropdownData('billers-list')
      .subscribe({
        next: (response) => {
          this.billers = response as CustomerList[];
        },
        error: (error) => console.error(error),
      });

    this.getDropdownData('drivers-list')
      .subscribe({
        next: (response) => {
          this.drivers = response as CustomerList[];
        },
        error: (error) => console.error(error),
      });

    this.shipperOptions = this.shipperControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterShippers(value || '')),
    );

    this.billersOptions = this.billersControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterBillers(value || '')),
    );

    this.receiversOptions = this.receiversControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterReceivers(value || '')),
    );

    this.driversOptions = this.driversControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDrivers(value || '')),
    );
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

}
