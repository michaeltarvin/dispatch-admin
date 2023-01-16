import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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


}
