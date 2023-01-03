import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadInterface } from "./load.interface";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'fury-add-edit-load',
  templateUrl: './add-edit-load.component.html',
  styleUrls: ['./add-edit-load.component.scss']
})
export class AddEditLoadComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialogRef: MatDialogRef<AddEditLoadComponent>,
    private http: HttpClient) {
  }

  load: LoadInterface;

  ngOnInit(): void {
    if (this.data.id > 0) {
      this.getLoad();
    } else {
      this.load = { is_active: true } as LoadInterface;
    }
  }

  getLoad() {
    this.http
      .get(`${environment.apiUrl}loads/${this.data.id}`)
      .subscribe({
        next: (response) => {
          this.load = response as LoadInterface;
          console.log(this.load);
        },
        error: (error) => console.error(error),
      });
  }

  close() {
    console.log(this.load);
    this.dialogRef.close('close');
  }

  save() {
    console.log(this.load);

    if (this.load.id > 0) {
      this.http
        .patch(`${environment.apiUrl}loads/${this.data.id}`, this.load)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => console.error(error),
        });
    } else {
      this.http
        .post(`${environment.apiUrl}loads`, this.load)
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
