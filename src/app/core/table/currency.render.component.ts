import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'fury-currency-renderer',
  template: ` <span> {{ value | currency }} </span> `,
})
export class CurrencyRenderer implements ICellRendererAngularComp {
  public value: any;

  //BOLD?  style="font-weight: bold"

  agInit(params: ICellRendererParams): void {
    this.value = params.value;
  }

  refresh(params: ICellRendererParams) {
    return params ? false : false;
  }
}
