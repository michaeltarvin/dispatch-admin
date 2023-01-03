import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DriverInterface } from "./driver.interface";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'fury-add-edit-driver',
  templateUrl: './add-edit-driver.component.html',
  styleUrls: ['./add-edit-driver.component.scss']
})
export class AddEditDriverComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialogRef: MatDialogRef<AddEditDriverComponent>,
    private http: HttpClient) {
  }

  driver: DriverInterface;

  ngOnInit(): void {
    if (this.data.id > 0) {
      this.getDriver();
    } else {
      this.driver = { is_active: true } as DriverInterface;
    }
  }

  getDriver() {
    this.http
      .get(`${environment.apiUrl}drivers/${this.data.id}`)
      .subscribe({
        next: (response) => {
          this.driver = response as DriverInterface;
          console.log(this.driver);
        },
        error: (error) => console.error(error),
      });
  }

  close() {
    console.log(this.driver);
    this.dialogRef.close('close');
  }

  save() {
    console.log(this.driver);

    if (this.driver.id > 0) {
      this.http
        .patch(`${environment.apiUrl}drivers/${this.data.id}`, this.driver)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => console.error(error),
        });
    } else {
      this.http
        .post(`${environment.apiUrl}drivers`, this.driver)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => console.error(error),
        });
    }

    this.dialogRef.close('saved');
  }

  stateList = [{ name: 'Alabama', 'abbreviation': 'AL' }, { name: 'Alaska', 'abbreviation': 'AK' }, { name: 'Arizona', 'abbreviation': 'AZ' }, { name: 'Arkansas', 'abbreviation': 'AR' }, { name: 'California', 'abbreviation': 'CA' }, { name: 'Colorado', 'abbreviation': 'CO' }, { name: 'Connecticut', 'abbreviation': 'CT' }, { name: 'Delaware', 'abbreviation': 'DE' }, { name: 'Florida', 'abbreviation': 'FL' }, { name: 'Georgia', 'abbreviation': 'GA' }, { name: 'Hawaii', 'abbreviation': 'HI' }, { name: 'Idaho', 'abbreviation': 'ID' }, { name: 'Illinois', 'abbreviation': 'IL' }, { name: 'Indiana', 'abbreviation': 'IN' }, { name: 'Iowa', 'abbreviation': 'IA' }, { name: 'Kansas', 'abbreviation': 'KS' }, { name: 'Kentucky', 'abbreviation': 'KY' }, { name: 'Louisiana', 'abbreviation': 'LA' }, { name: 'Maine', 'abbreviation': 'ME' }, { name: 'Maryland', 'abbreviation': 'MD' }, { name: 'Massachusetts', 'abbreviation': 'MA' }, { name: 'Michigan', 'abbreviation': 'MI' }, { name: 'Minnesota', 'abbreviation': 'MN' }, { name: 'Mississippi', 'abbreviation': 'MS' }, { name: 'Missouri', 'abbreviation': 'MO' }, { name: 'Montana', 'abbreviation': 'MT' }, { name: 'Nebraska', 'abbreviation': 'NE' }, { name: 'Nevada', 'abbreviation': 'NV' }, { name: 'New Hampshire', 'abbreviation': 'NH' }, { name: 'New Jersey', 'abbreviation': 'NJ' }, { name: 'New Mexico', 'abbreviation': 'NM' }, { name: 'New York', 'abbreviation': 'NY' }, { name: 'North Carolina', 'abbreviation': 'NC' }, { name: 'North Dakota', 'abbreviation': 'ND' }, { name: 'Ohio', 'abbreviation': 'OH' }, { name: 'Oklahoma', 'abbreviation': 'OK' }, { name: 'Oregon', 'abbreviation': 'OR' }, { name: 'Pennsylvania', 'abbreviation': 'PA' }, { name: 'Rhode Island', 'abbreviation': 'RI' }, { name: 'South Carolina', 'abbreviation': 'SC' }, { name: 'South Dakota', 'abbreviation': 'SD' }, { name: 'Tennessee', 'abbreviation': 'TN' }, { name: 'Texas', 'abbreviation': 'TX' }, { name: 'Utah', 'abbreviation': 'UT' }, { name: 'Vermont', 'abbreviation': 'VT' }, { name: 'Virginia', 'abbreviation': 'VA' }, { name: 'Washington', 'abbreviation': 'WA' }, { name: 'West Virginia', 'abbreviation': 'WV' }, { name: 'Wisconsin', 'abbreviation': 'WI' }, { name: 'Wyoming', 'abbreviation': 'WY' }];

}
