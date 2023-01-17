import { Component, EventEmitter, Input, Output, OnDestroy } from "@angular/core";
import { CellClickedEvent, ColDef, GridOptions, GridApi, RowDragEndEvent, SelectionChangedEvent } from "ag-grid-community";
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
  @Output() selectionChanged = new EventEmitter<any>();
  @Output() rowDoubleClicked = new EventEmitter<any>();
  @Output() rowDragEnd = new EventEmitter<any>();
  @Output() tableReady: EventEmitter<any> = new EventEmitter<any>();

  tableTheme: string;
  gridApi: GridApi;
  domLayout: any;

  public style: any = {
    width: '100%',
    height: '100%',
    flex: '1 1 auto',
  };

  rowStyle = {};

  // set background color when load has linked loads
  getRowStyle(params: any) {
    //'background-color': "#c4c9cc",
    //'font-weight': 'bold'
    if (params.data.has_linked_loads === true) {
      return { 'background-color': "#1976d2", 'color': "white" }
    }
    return null;
  };

  public defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true,
  };

  ngOnInit(): void {
    this.tableTheme = this.getTableTheme();
  }

  onCellClicked($event: CellClickedEvent) {
    this.cellClicked.emit($event);
  }

  onSelectionChanged($event: SelectionChangedEvent) {
    this.selectionChanged.emit($event);
  }

  ngOnDestroy() {
    this.gridOptions = null;
    this.columnDefs = null;
    this.rowData = null;
  }

  getTableTheme(): string {
    const theme = window.localStorage.getItem("table-theme");
    if (theme)
      return theme.toString();
    return environment.tableTheme;
  }

  isDarkTheme(): boolean {
    const theme = window.localStorage.getItem("theme");
    return theme.indexOf('dark') >= 0;
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.setDomLayout("autoHeight");
    this.gridApi.sizeColumnsToFit(params);
    this.tableReady.emit(params);
  }

  onRowDragEnd($event: RowDragEndEvent) {
    this.rowDragEnd.emit($event);
  }

}
