import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DriverType } from "./driver-type";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'fury-add-edit-driver-type',
  templateUrl: './add-edit-driver-type.component.html',
  styleUrls: ['./add-edit-driver-type.component.scss']
})
export class AddEditDriverTypeComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditDriverTypeComponent>,
    private http: HttpClient) {
  }

  form: FormGroup;
  driverType: DriverType;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });

    if (this.data.id > 0) {
      this.getDriverType();
    }
  }

  getDriverType() {
    this.http
      .get<DriverType>(`${environment.apiUrl}driver_types/${this.data.id}`)
      .subscribe({
        next: (response) => {
          this.driverType = response;
          this.form.patchValue(this.driverType);
        },
        error: (error) => console.error(error),
      });
  }

  close() {
    this.dialogRef.close('close');
  }

  save() {

    let r = (this.driverType.id > 0) ?
      this.http.patch(`${environment.apiUrl}driver_types/${this.data.id}`, this.form.value) :
      this.http.post(`${environment.apiUrl}driver_types`, this.form.value);

    r.subscribe({
      next: () => {
        this.dialogRef.close('saved');
      },
      error: (error) => console.error(error),
    });

  }

}
