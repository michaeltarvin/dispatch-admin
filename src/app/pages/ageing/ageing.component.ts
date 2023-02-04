import { Component } from '@angular/core';
import { CellClickedEvent } from 'ag-grid-community';

@Component({
  selector: 'fury-ageing',
  templateUrl: './ageing.component.html',
  styleUrls: ['./ageing.component.scss']
})
export class AgeingComponent {

  constructor() { }

  tableName: string = 'ageing';
  dataRoute: string = 'ageing';

  onCellClicked(e: CellClickedEvent): void {
    this.openDialog(e.data.id);
  }

  openDialog($id: Number) {
    console.log($id);
    //TODO: find out if ageing has any actions on row click
  }

}
