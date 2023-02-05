import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  public refresh$: EventEmitter<boolean>;
  public resize$: EventEmitter<boolean>;

  constructor() {
    this.refresh$ = new EventEmitter();
    this.resize$ = new EventEmitter();
  }

  public refresh(value: boolean): void {
    this.refresh$.emit(value);
  }

  public resize(value: boolean = true): void {
    this.resize$.emit(value);
  }
}
