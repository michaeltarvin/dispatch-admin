import { Component, EventEmitter, Input, Output, OnDestroy } from "@angular/core";
import { CellClickedEvent, ColDef, GridOptions, GridApi, RowDragEndEvent, SelectionChangedEvent } from "ag-grid-community";
import { HttpClient } from '@angular/common/http';
import { TableInterface } from './table.column.interface';
import { TableService } from './table.service';
import { environment } from '../../../environments/environment';
import * as moment from "moment";

@Component({
  selector: "ms-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})
export class TableComponent implements OnDestroy {

  @Input() tableName: string = '';
  @Input() dataRoute: string = '';
  @Input() gridOptions: GridOptions;
  @Input() columnDefs: ColDef[] = [];
  @Input() rowData: any;
  @Input() rowSelection = "single";
  @Output() cellClicked = new EventEmitter<any>();
  @Output() selectionChanged = new EventEmitter<any>();
  @Output() rowDoubleClicked = new EventEmitter<any>();
  @Output() rowDragEnd = new EventEmitter<any>();
  @Output() tableReady: EventEmitter<any> = new EventEmitter<any>();

  tableTheme: string;
  gridApi: GridApi;
  domLayout: any;
  params: any;

  public style: any = {
    width: '100%',
    height: '100%',
    flex: '1 1 auto',
  };

  constructor(private http: HttpClient, private tableService: TableService) {

    this.tableService.refresh$.subscribe(item => this.refreshTable(item));
  }

  ngOnInit(): void {
    this.tableTheme = this.getTableTheme();

    if (this.tableName && this.tableName != '') {
      this.getTableColumns();
    }

    this.gedata();
  }

  gedata() {
    if (this.dataRoute && this.dataRoute != '') {
      this.http
        .get(`${environment.apiUrl}${this.dataRoute}`)
        .subscribe({
          next: (response) => {
            this.rowData = response;
          },
          error: (error) => console.error(error),
        });
    }
  }

  refreshTable(apply: boolean) {
    if (apply) {
      this.gedata();
    }
  }

  getTableColumns() {
    this.http
      .get<TableInterface[]>(`${environment.apiUrl}table?table_name=${this.tableName}`)
      .subscribe({
        next: (response) => {
          let data = response;
          let cd: ColDef[] = [];

          if (data) {
            data.forEach((item) => {

              const column: ColDef = {
                field: item.field,
                hide: item.hide,
                width: item.width,
                rowDrag: item.rowDrag,
                suppressSizeToFit: item.suppressSizeToFit,
              };

              if (item.headerName && item.headerName != '') {
                column.headerName = item.headerName;
              }

              if (item.type === 'date') {
                column.valueFormatter = this.dateFormatter;
              }

              if (item.type === 'currency') {
                column.valueFormatter = this.moneyFormatter;
              }

              if (item.type === 'checkbox') {
                column.headerCheckboxSelection = true;
                column.checkboxSelection = true;
                column.showDisabledCheckboxes = true;
              }

              cd.push(column);
            });
            this.columnDefs = cd;
            this.gridApi.sizeColumnsToFit({
              defaultMinWidth: 500,
            });
          }
        },
        error: (error) => console.error(error),
      });
  }

  // set background color when load has linked loads
  getRowStyle(params: any) {
    if (params.data.has_linked_loads === true) {
      return { 'background-color': "#1976d2", 'color': "white" }
    }

    const username = window.localStorage.getItem("username");
    if (username) {
      if (params.data.is_closed === false && params.data.to_user == username.toString()) {
        return { 'background-color': "#1976d2", 'color': "white" }
      }
    }

    return null;
  };

  public defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true,
  };

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
    this.params = params;
    this.gridApi = params.api;
    this.gridApi.setDomLayout("autoHeight");
    // this.gridApi.sizeColumnsToFit(params);
    this.tableReady.emit(params);
  }

  onRowDragEnd($event: RowDragEndEvent) {
    this.rowDragEnd.emit($event);
  }

  dateFormatter(params: any): string {
    return params.value ? moment(params.value).format('lll') : '';
  }

  moneyFormatter(params: any): string {
    return `$${params.value}`
  }

}
