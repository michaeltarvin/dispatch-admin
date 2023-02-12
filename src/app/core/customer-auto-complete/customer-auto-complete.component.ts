import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CustomerList } from '../classes/customer.list';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'fury-customer-auto-complete',
  templateUrl: './customer-auto-complete.component.html',
  styleUrls: ['./customer-auto-complete.component.scss']
})
export class CustomerAutoCompleteComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.setup();
  }

  @Input() customerId: number;
  @Input() customerType: string;
  @Input() title: string;
  @Input() floatLabel: string = "never";
  @Output() selectionChanged = new EventEmitter<any>();

  customers: any[] = [];
  customersControl = new FormControl(new CustomerList());
  customersOptions: Observable<string[]>;

  setup() {

    this.http.get(`${environment.apiUrl}${this.customerType}`)
      .subscribe({
        next: (response) => {
          this.customers = response as CustomerList[];
          if (this.customerId > 0) {
            this.customersControl.setValue(this.getCustomerFromArray(this.customerId, this.customers));
          }
          this.customersOptions = this.customersControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filterBillers(value || '')),
          );
        },
        error: (error) => console.error(error),
      });
  }

  getCustomerFromArray(id: number, list: CustomerList[]): any {
    return list.find((obj) => {
      return obj.id === id;
    });
  }

  onOptionSelected($event: MatAutocompleteSelectedEvent) {
    this.selectionChanged.emit($event.option.value);
  }

  private _filterBillers(value: any): string[] {

    let filterValue = '';
    if ((typeof value) == 'string') {
      filterValue = value.toLowerCase();
    }

    return this.customers.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFn(customer: CustomerList): string {
    return customer && customer.name ? customer.name : '';
  }

}
