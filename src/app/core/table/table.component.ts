import { Component, EventEmitter, Input, Output, OnDestroy } from "@angular/core";
import { CellClickedEvent, ColDef, GridOptions } from "ag-grid-community";
import { environment } from '../../../environments/environment';

@Component({
  selector: "ms-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})
export class TableComponent implements OnDestroy {

  @Input() tableTitle: string;
  @Input() gridOptions: GridOptions;
  @Input() columnDefs: any[];
  @Input() rowData: any[];
  @Input() rowSelection = "single";
  @Output() cellClicked = new EventEmitter<any>();
  @Output() rowDoubleClicked = new EventEmitter<any>();

  tableTheme: string;

  public style: any = {
    width: '100%',
    height: '100%',
    flex: '1 1 auto',
  };

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  ngOnInit(): void {
    this.tableTheme = this.getTableTheme();
  }

  onCellClicked($event: CellClickedEvent) {
    this.cellClicked.emit($event);
  }

  ngOnDestroy() {
    this.gridOptions = null;
    this.columnDefs = null;
    this.rowData = null;
  }

  getTableTheme(): string {
    const theme = window.localStorage.getItem("table-theme").toString();
    if (theme)
      return theme;
    return environment.tableTheme;
  }

  // Example using Grid's API
  // clearSelection(): void {
  //   this.agGrid.api.deselectAll();
  // }
  //
  // fillLarge() {
  //   this.setWidthAndHeight('100%', '100%');
  // }
  //
  // fillExact() {
  //   this.setWidthAndHeight('400px', '400px');
  // }
  //
  // setWidthAndHeight(width: string, height: string) {
  //   this.style = {
  //     width: width,
  //     height: height,
  //   };
  // }

}
