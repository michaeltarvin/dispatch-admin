import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
          this.tableService.refresh(true);
        },
        error: (error) => console.error(error),
      });
  }

}
