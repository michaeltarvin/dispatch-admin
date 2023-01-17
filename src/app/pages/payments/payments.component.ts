import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ColDef, SelectionChangedEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';

export class CustomerList {
  id: number;
  name: string;
  alias: string;
}

@Component({
  selector: 'fury-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.setupCustomers();
  }

  rowData: any = [];
  totalAmount: number = 0;

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'Load ID', hide: true },
    {
      field: 'trip_id', headerName: 'Trip', width: 155,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,

    },
    { field: 'days_past_due', headerName: 'Days Past Due', width: 170 },
    { field: 'type', headerName: 'Type', width: 115 },
    { field: 'deldate', headerName: "Delivery Date", width: 175, valueFormatter: this.dateFormatter },
    { field: 'total', headerName: 'Total $', width: 115, valueFormatter: this.moneyFormatter },
    { field: 'allmoney', headerName: 'All $', width: 115, valueFormatter: this.moneyFormatter },
    { field: 'shipper', headerName: 'Shipper', width: 175 },
    { field: 'receiver', headerName: 'Receiver', width: 175 },
  ];

  billerId: number;
  billers: any = [];
  billersControl = new FormControl(new CustomerList());
  billersOptions: Observable<string[]>;

  getDropdownData(type: string) {
    return this.http.get(`${environment.apiUrl}${type}`);
  }

  setupCustomers() {

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
  }

  getUnpaidLoadsForBiller($event: any) {
    this.totalAmount = 0;
    this.billerId = $event.option.value.id;
    this.http
      .get(`${environment.apiUrl}ageing?billto_id=${this.billerId}`)
      .subscribe({
        next: (response) => {
          this.rowData = response;
        },
        error: (error) => console.error(error),
      });
  }

  onSelectionChanged($event: SelectionChangedEvent) {
    const selection = $event.api.getSelectedRows();
    this.totalAmount = 0;

    if (selection) {
      selection.forEach((value) => {
        this.totalAmount += Number(value.allmoney);
      });
    }
  }

  private _filterBillers(value: any): string[] {

    let filterValue = '';
    if ((typeof value) == 'string') {
      filterValue = value.toLowerCase();
    }

    return this.billers.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFn(customer: CustomerList): string {
    return customer && customer.name ? customer.name : '';
  }

  moneyFormatter(params: any): string {
    return `$${params.value}`
  }

  dateFormatter(params: any): string {
    return moment(params.value).format('ll');
  }

}
