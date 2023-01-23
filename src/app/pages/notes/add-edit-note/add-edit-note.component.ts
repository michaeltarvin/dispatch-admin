import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteInterface } from "./note-interface";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'fury-add-edit-note',
  templateUrl: './add-edit-note.component.html',
  styleUrls: ['./add-edit-note.component.scss']
})
export class AddEditNoteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialogRef: MatDialogRef<AddEditNoteComponent>,
    private http: HttpClient) {
  }

  note: NoteInterface;
  users: any = [];

  ngOnInit(): void {
    this.getUsers();

    if (this.data.id > 0) {
      this.getNote();
    } else {
      this.note = { title: "" } as NoteInterface;
    }
  }

  getNote() {
    this.http
      .get<NoteInterface>(`${environment.apiUrl}notes/${this.data.id}`)
      .subscribe({
        next: (response) => {
          this.note = response;
          this.note.request = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
          this.note.response = this.note.request;
        },
        error: (error) => console.error(error),
      });
  }

  getUsers() {
    this.http
      .get(`${environment.apiUrl}users`)
      .subscribe({
        next: (response) => {
          this.users = response;
        },
        error: (error) => console.error(error),
      });
  }

  close() {
    this.dialogRef.close('close');
  }

  save() {
    if (this.note.id > 0) {
      this.http
        .patch(`${environment.apiUrl}notes/${this.data.id}`, this.note)
        .subscribe({
          error: (error) => console.error(error),
        });
    } else {
      this.http
        .post(`${environment.apiUrl}notes`, this.note)
        .subscribe({
          error: (error) => console.error(error),
        });
    }

    this.dialogRef.close('saved');
  }

}
