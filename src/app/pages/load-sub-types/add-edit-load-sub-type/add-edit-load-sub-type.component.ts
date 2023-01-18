import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadSubTypeInterface } from "./load-sub-type.interface";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'fury-add-edit-load-sub-type',
  templateUrl: './add-edit-load-sub-type.component.html',
  styleUrls: ['./add-edit-load-sub-type.component.scss']
})
export class AddEditLoadSubTypeComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialogRef: MatDialogRef<AddEditLoadSubTypeComponent>,
    private http: HttpClient) {
  }

  loadSubType: LoadSubTypeInterface;

  ngOnInit(): void {
    if (this.data.id > 0) {
      this.getDriverTypes();
    } else {
      this.loadSubType = { name: "" } as LoadSubTypeInterface;
    }
  }

  getDriverTypes() {
    this.http
      .get<LoadSubTypeInterface>(`${environment.apiUrl}loadSubTypes/${this.data.id}`)
      .subscribe({
        next: (response) => {
          this.loadSubType = response;
          console.log(this.loadSubType);
        },
        error: (error) => console.error(error),
      });
  }

  close() {
    console.log(this.loadSubType);
    this.dialogRef.close('close');
  }

  save() {
    console.log(this.loadSubType);

    if (this.loadSubType.id > 0) {
      this.http
        .patch(`${environment.apiUrl}loadSubTypes/${this.data.id}`, this.loadSubType)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => console.error(error),
        });
    } else {
      this.http
        .post(`${environment.apiUrl}loadSubTypes`, this.loadSubType)
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
