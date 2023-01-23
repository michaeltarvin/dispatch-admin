import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerTypeInterface } from "./customer-type.interface";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'fury-add-edit-customer-type',
  templateUrl: './add-edit-customer-type.component.html',
  styleUrls: ['./add-edit-customer-type.component.scss']
})
export class AddEditCustomerTypeComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialogRef: MatDialogRef<AddEditCustomerTypeComponent>,
    private http: HttpClient) {
  }

  customerType: CustomerTypeInterface;

  ngOnInit(): void {
    if (this.data.id > 0) {
      this.getDriver();
    } else {
      this.customerType = { name: "" } as CustomerTypeInterface;
    }
  }

  getDriver() {
    this.http
      .get(`${environment.apiUrl}customer_types/${this.data.id}`)
      .subscribe({
        next: (response) => {
          this.customerType = response as CustomerTypeInterface;
          console.log(this.customerType);
        },
        error: (error) => console.error(error),
      });
  }

  close() {
    console.log(this.customerType);
    this.dialogRef.close('close');
  }

  save() {
    console.log(this.customerType);

    if (this.customerType.id > 0) {
      this.http
        .patch(`${environment.apiUrl}customer_types/${this.data.id}`, this.customerType)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => console.error(error),
        });
    } else {
      this.http
        .post(`${environment.apiUrl}customer_types`, this.customerType)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => console.error(error),
        });
    }

    this.dialogRef.close('saved');
  }

}
