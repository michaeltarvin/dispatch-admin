import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerInterface } from "./customer.interface";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'fury-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.scss']
})
export class AddEditCustomerComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialogRef: MatDialogRef<AddEditCustomerComponent>,
    private http: HttpClient) {
  }

  panelOpenState = false;
  customer: CustomerInterface;
  customerTypes: any = [];

  ngOnInit(): void {

    this.getCustomerTypes();

    if (this.data.id > 0) {
      this.getCustomer();
    } else {
      this.customer = { is_active: true } as CustomerInterface;
    }
  }

  getCustomerTypes() {
    //customerTypes
    this.http
      .get(`${environment.apiUrl}customer_types`)
      .subscribe({
        next: (response) => {
          this.customerTypes = response as CustomerInterface;
        },
        error: (error) => console.error(error),
      });
  }

  getCustomer() {
    this.http
      .get(`${environment.apiUrl}customers/${this.data.id}`)
      .subscribe({
        next: (response) => {
          this.customer = response as CustomerInterface;
        },
        error: (error) => console.error(error),
      });
  }

  close() {
    this.dialogRef.close('close');
  }

  save() {
    if (this.customer.id > 0) {
      this.http
        .patch(`${environment.apiUrl}customers/${this.data.id}`, this.customer)
        .subscribe({
          error: (error) => console.error(error),
        });
    } else {
      this.http
        .post(`${environment.apiUrl}customers`, this.customer)
        .subscribe({
          error: (error) => console.error(error),
        });
    }

    this.dialogRef.close('saved');
  }

  stateList = [{ name: 'Alabama', 'abbreviation': 'AL' }, { name: 'Alaska', 'abbreviation': 'AK' }, { name: 'Arizona', 'abbreviation': 'AZ' }, { name: 'Arkansas', 'abbreviation': 'AR' }, { name: 'California', 'abbreviation': 'CA' }, { name: 'Colorado', 'abbreviation': 'CO' }, { name: 'Connecticut', 'abbreviation': 'CT' }, { name: 'Delaware', 'abbreviation': 'DE' }, { name: 'Florida', 'abbreviation': 'FL' }, { name: 'Georgia', 'abbreviation': 'GA' }, { name: 'Hawaii', 'abbreviation': 'HI' }, { name: 'Idaho', 'abbreviation': 'ID' }, { name: 'Illinois', 'abbreviation': 'IL' }, { name: 'Indiana', 'abbreviation': 'IN' }, { name: 'Iowa', 'abbreviation': 'IA' }, { name: 'Kansas', 'abbreviation': 'KS' }, { name: 'Kentucky', 'abbreviation': 'KY' }, { name: 'Louisiana', 'abbreviation': 'LA' }, { name: 'Maine', 'abbreviation': 'ME' }, { name: 'Maryland', 'abbreviation': 'MD' }, { name: 'Massachusetts', 'abbreviation': 'MA' }, { name: 'Michigan', 'abbreviation': 'MI' }, { name: 'Minnesota', 'abbreviation': 'MN' }, { name: 'Mississippi', 'abbreviation': 'MS' }, { name: 'Missouri', 'abbreviation': 'MO' }, { name: 'Montana', 'abbreviation': 'MT' }, { name: 'Nebraska', 'abbreviation': 'NE' }, { name: 'Nevada', 'abbreviation': 'NV' }, { name: 'New Hampshire', 'abbreviation': 'NH' }, { name: 'New Jersey', 'abbreviation': 'NJ' }, { name: 'New Mexico', 'abbreviation': 'NM' }, { name: 'New York', 'abbreviation': 'NY' }, { name: 'North Carolina', 'abbreviation': 'NC' }, { name: 'North Dakota', 'abbreviation': 'ND' }, { name: 'Ohio', 'abbreviation': 'OH' }, { name: 'Oklahoma', 'abbreviation': 'OK' }, { name: 'Oregon', 'abbreviation': 'OR' }, { name: 'Pennsylvania', 'abbreviation': 'PA' }, { name: 'Rhode Island', 'abbreviation': 'RI' }, { name: 'South Carolina', 'abbreviation': 'SC' }, { name: 'South Dakota', 'abbreviation': 'SD' }, { name: 'Tennessee', 'abbreviation': 'TN' }, { name: 'Texas', 'abbreviation': 'TX' }, { name: 'Utah', 'abbreviation': 'UT' }, { name: 'Vermont', 'abbreviation': 'VT' }, { name: 'Virginia', 'abbreviation': 'VA' }, { name: 'Washington', 'abbreviation': 'WA' }, { name: 'West Virginia', 'abbreviation': 'WV' }, { name: 'Wisconsin', 'abbreviation': 'WI' }, { name: 'Wyoming', 'abbreviation': 'WY' }];

}
