import { Component } from '@angular/core';
import { CellClickedEvent } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { TableService } from '../../core/table/table.service';

@Component({
  selector: 'fury-ageing',
  templateUrl: './ageing.component.html',
  styleUrls: ['./ageing.component.scss']
})
export class AgeingComponent {

  constructor(private dialog: MatDialog, private tableService: TableService) { }

  tableName: string = 'ageing';
  dataRoute: string = 'ageing';

  onCellClicked(e: CellClickedEvent): void {
    this.openDialog(e.data.id);
  }

  openDialog($id: Number) {
    console.log($id)
  }

}
