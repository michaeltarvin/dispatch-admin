import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { GridApi } from 'ag-grid-community';
import { TableService } from '../../core/table/table.service';
import { CustomerList } from '../../core/classes/customer.list';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'fury-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {

  constructor(private http: HttpClient, private tableService: TableService) { }

  ngOnInit(): void { }

  tableName: string = 'payment_history';
  rowData: any = [];
  billerId: number;
  showRecentPayments: boolean = false;
  gridApi: GridApi;

  onTableReady(params: any) {
    this.gridApi = params.api;
  }

  onCustomerChange($event: CustomerList) {
    this.getPaymentHistory($event.id);
    this.showRecentPayments = false;
  }

  onCheckBoxShowRecentChanged($event: MatCheckboxChange) {
    if ($event.checked === true) {
      this.getPaymentHistory();
    } else {
      this.rowData = [];
    }
  }

  getPaymentHistory($id: number = 0) {
    this.billerId = $id;
    const url = $id == 0 ? '' : `?customer_id=${this.billerId}`;
    this.http
      .get(`${environment.apiUrl}payments${url}`)
      .subscribe({
        next: (response) => {
          this.rowData = response;
          this.tableService.refresh(true);
          this.sizeColumnsToFit();
        },
        error: (error) => console.error(error),
      });
  }

  sizeColumnsToFit() {
    this.gridApi.sizeColumnsToFit({
      defaultMinWidth: 200,
    });
  }

}
