import { Component, EventEmitter, Input, Output, OnDestroy } from "@angular/core";
import { CellClickedEvent, ColDef, GridOptions, GridApi } from "ag-grid-community";
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
  gridApi: GridApi;
  domLayout: any;

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
    const theme = window.localStorage.getItem("table-theme");
    if (theme)
      return theme.toString();
    return environment.tableTheme;
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.setDomLayout("autoHeight");
  }

}
