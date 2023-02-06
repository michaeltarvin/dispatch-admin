import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  public refresh$: EventEmitter<boolean>;
  public resize$: EventEmitter<boolean>;
  public dataRouteChange$: EventEmitter<string>;

  constructor() {
    this.refresh$ = new EventEmitter();
    this.resize$ = new EventEmitter();
    this.dataRouteChange$ = new EventEmitter();
  }

  public refresh(value: boolean): void {
    this.refresh$.emit(value);
  }

  public resize(value: boolean = true): void {
    this.resize$.emit(value);
  }

  public dataRouteChange(route: string): void {
    this.dataRouteChange$.emit(route);
  }
}
