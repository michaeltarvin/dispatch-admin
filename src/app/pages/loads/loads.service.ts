import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadsService {

  public tripChanged$: EventEmitter<number>;
  public dateChanged$: EventEmitter<string>;

  constructor() {
    this.tripChanged$ = new EventEmitter();
    this.dateChanged$ = new EventEmitter();
  }

  public tripChanged(id: number): void {
    this.tripChanged$.emit(id);
  }

  public dateChanged(date: string): void {
    this.dateChanged$.emit(date);
  }

}
