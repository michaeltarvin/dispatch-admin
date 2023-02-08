import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridApi, SelectionChangedEvent } from 'ag-grid-community';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TableService } from '../../core/table/table.service';
import { CustomerList } from '../../core/classes/customer.list';
import { Payment } from '../../core/classes/payment';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'fury-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar,
    private tableService: TableService) { }

  ngOnInit(): void { }

  tableName: string = 'ageing';
  rowData: any = [];
  totalAmount: number = 0;
  paymentAmount: number;
  paymentBalance: number = 0;
  checkNumber: string;
  checkDate: Date;
  gridApi: GridApi;
  billerId: number;
  canCreatePayment: boolean = false;

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
          this.tableService.refresh(true);
          this.gridApi.sizeColumnsToFit({
            defaultMinWidth: 200,
          });
        },
        error: (error) => this.openSnackBar(error),
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
        check_number: this.checkNumber,
        check_date: this.checkDate,
        user_id: Number(window.localStorage.getItem("userId").toString()),
        loadIds: ids,
        is_partial: false
      };

      this.http
        .post<Payment>(`${environment.apiUrl}payments`, payment)
        .subscribe({
          next: (response) => {
            this.getUnpaidLoadsForBiller(this.billerId);
            this.paymentAmount = null;
            this.canCreatePayment = false;
            this.openSnackBar(`Payment Created: ${response.id}`);
          },
          error: (error) => {
            this.openSnackBar(error.error.message);
          },
        });
    }
  }

  findLoads() {

    if (this.paymentAmount && this.paymentAmount > 0) {

      this.paymentBalance = 0;
      let balance = this.paymentAmount;

      //unselect all rows first
      this.gridApi.forEachNode((node) => {
        node.setSelected(false);
      });

      this.gridApi.forEachNode((node) => {

        let am = node.data.allmoney;
        if (balance >= am) {
          balance -= am;
          node.setSelected(true);
        }
      });

      this.paymentBalance = balance;
    }
  }

  openSnackBar(message: string, action: string = 'Close') {

    const config: MatSnackBarConfig = {
      duration: 4 * 1000,
      horizontalPosition: 'center',
      panelClass: "success-dialog"
    };

    this._snackBar.open(message, action, config);
  }

}
