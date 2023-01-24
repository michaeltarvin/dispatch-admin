import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridApi, ColDef, SelectionChangedEvent } from 'ag-grid-community';
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

  ngOnInit(): void { }

  rowData: any = [];
  totalAmount: number = 0;
  paymentAmount: number;
  paymentBalance: number = 0;
  gridApi: GridApi;
  billerId: number;
  canCreatePayment: boolean = false;

  columnDefs: ColDef[] = [
    { field: 'id', hide: true },
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

  onTableReady(params: any) {
    this.gridApi = params.api;
  }

  onCustomerChange($event: CustomerList) {
    this.getUnpaidLoadsForBiller($event.id);
  }

  getUnpaidLoadsForBiller($id: number) {
    this.totalAmount = 0;
    this.billerId = $id;
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
        this.canCreatePayment = true;
      });
    }
  }

  createPayment() {
    const selection = this.gridApi.getSelectedRows();
    const ids: number[] = [];
    if (selection) {

      selection.forEach((value) => {
        ids.push(value.id);
      });

      const payment = {
        amount: this.paymentAmount,
        customer_id: this.billerId,
        user_id: Number(window.localStorage.getItem("userId").toString()),
        loadIds: ids,
        is_partial: false
      };

      this.http
        .post(`${environment.apiUrl}payments`, payment)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.getUnpaidLoadsForBiller(this.billerId);
            this.paymentAmount = null;
            this.canCreatePayment = false;
          },
          error: (error) => {
            console.error(error.error.message);
          },
        });
    }
  }

  disableCreatePayment() {
    return this.billerId <= 0;
  }

  findLoads() {

    if (this.paymentAmount && this.paymentAmount > 0) {

      this.paymentBalance = 0;
      let balance = this.paymentAmount;

      console.log('starting balance: ', balance);

      this.gridApi.forEachNode((node) => {

        let am = node.data.allmoney;
        if (balance >= am) {
          balance -= am;
          node.setSelected(true);

          console.log('allmoney: ', am);
          console.log('new balance: ', balance);

        }
      });

      this.paymentBalance = balance;
    }

  }

  moneyFormatter(params: any): string {
    return `$${params.value}`
  }

  dateFormatter(params: any): string {
    return moment(params.value).format('ll');
  }

}
