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
      .get<LoadSubTypeInterface>(`${environment.apiUrl}load_sub_types/${this.data.id}`)
      .subscribe({
        next: (response) => {
          this.loadSubType = response;
        },
        error: (error) => console.error(error),
      });
  }

  close() {
    this.dialogRef.close('close');
  }

  save() {
    if (this.loadSubType.id > 0) {
      this.http
        .patch(`${environment.apiUrl}load_sub_types/${this.data.id}`, this.loadSubType)
        .subscribe({
          error: (error) => console.error(error),
        });
    } else {
      this.http
        .post(`${environment.apiUrl}load_sub_types`, this.loadSubType)
        .subscribe({
          error: (error) => console.error(error),
        });
    }

    this.dialogRef.close('saved');
  }

}
