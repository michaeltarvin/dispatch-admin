import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  public refresh$: EventEmitter<boolean>;

  constructor() {
    this.refresh$ = new EventEmitter();
  }

  public refresh(value: boolean): void {
    this.refresh$.emit(value);
  }
}
