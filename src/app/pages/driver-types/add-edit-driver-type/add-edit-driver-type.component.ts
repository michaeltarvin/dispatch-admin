import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DriverTypeInterface } from "./driver-type.interface";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'fury-add-edit-driver-type',
  templateUrl: './add-edit-driver-type.component.html',
  styleUrls: ['./add-edit-driver-type.component.scss']
})
export class AddEditDriverTypeComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialogRef: MatDialogRef<AddEditDriverTypeComponent>,
    private http: HttpClient) {
  }

  driverType: DriverTypeInterface;

  ngOnInit(): void {
    if (this.data.id > 0) {
      this.getDriverTypes();
    } else {
      this.driverType = { name: "" } as DriverTypeInterface;
    }
  }

  getDriverTypes() {
    this.http
      .get(`${environment.apiUrl}driverTypes/${this.data.id}`)
      .subscribe({
        next: (response) => {
          this.driverType = response as DriverTypeInterface;
          console.log(this.driverType);
        },
        error: (error) => console.error(error),
      });
  }

  close() {
    console.log(this.driverType);
    this.dialogRef.close('close');
  }

  save() {
    console.log(this.driverType);

    if (this.driverType.id > 0) {
      this.http
        .patch(`${environment.apiUrl}driverTypes/${this.data.id}`, this.driverType)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => console.error(error),
        });
    } else {
      this.http
        .post(`${environment.apiUrl}driverTypes`, this.driverType)
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
