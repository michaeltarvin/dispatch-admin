import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef } from 'ag-grid-community';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';

export class CustomerList {
  id: number;
  name: string;
  alias: string;
}

@Component({
  selector: 'fury-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  rowData: any = [];
  billerId: number;

  columnDefs: ColDef[] = [
    { field: 'id' },
    { field: 'amount', width: 170, valueFormatter: this.moneyFormatter },
    { field: 'customer', width: 200 },
    { field: 'user', headerName: "Created By", width: 200 },
    { field: 'is_partial', headerName: 'Partial', width: 175 },
    { field: 'created_at', headerName: 'Created', width: 200, valueFormatter: this.dateFormatter }
  ];

  onCustomerChange($event: CustomerList) {
    this.getPaymentHistory($event.id);
  }

  getPaymentHistory($id: number) {
    this.billerId = $id;
    this.http
      .get(`${environment.apiUrl}payments?customer_id=${this.billerId}`)
      .subscribe({
        next: (response) => {
          this.rowData = response;
        },
        error: (error) => console.error(error),
      });
  }

  moneyFormatter(params: any): string {
    return `$${params.value}`
  }

  dateFormatter(params: any): string {
    return moment(params.value).format('ll');
  }

}
