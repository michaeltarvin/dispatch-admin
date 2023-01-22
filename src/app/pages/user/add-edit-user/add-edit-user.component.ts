import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInterface } from "./user.interface";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'fury-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialogRef: MatDialogRef<AddEditUserComponent>,
    private http: HttpClient) {
  }

  user: UserInterface;
  confirmPassword: string;

  ngOnInit(): void {
    if (this.data.id > 0) {
      this.getUser();
    } else {
      this.user = { name: "" } as UserInterface;
    }
  }

  getUser() {
    this.http
      .get(`${environment.apiUrl}users/${this.data.id}`)
      .subscribe({
        next: (response) => {
          this.user = response as UserInterface;
        },
        error: (error) => console.error(error),
      });
  }

  close() {
    this.dialogRef.close('close');
  }

  save() {
    console.log(this.user);

    if (this.user.id > 0) {
      this.http
        .patch(`${environment.apiUrl}users/${this.data.id}`, this.user)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => console.error(error),
        });
    } else {
      this.http
        .post(`${environment.apiUrl}users`, this.user)
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
