import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef, GridOptions, RowDragEndEvent } from 'ag-grid-community';
import { MatSelectChange } from '@angular/material/select';
import { TableInterface } from '../../core/table/table.column.interface';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'fury-table-settings',
  templateUrl: './table-settings.component.html',
  styleUrls: ['./table-settings.component.scss']
})
export class TableSettingsComponent implements OnInit {

  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService, ) { }

  ngOnInit(): void {
    this.tableTheme = this.getTableTheme();
    this.getTableNames();
  }

  tableNames: any = [];
  selectedTableName: string;
  columnData: TableInterface[] = [];
  tableTheme: string;
  gridOptions: GridOptions;
  showSpinners = true;

  public columnDefs: ColDef[] = [
    {
      field: 'id',
      hide: true,
      editable: false,
    },
    {
      field: 'table_name',
      hide: true,
      editable: false,
    },
    {
      field: 'field',
      headerTooltip: 'This the API property name, it cannot be changed.',
      editable: false,
      rowDrag: true,
    },
    {
      field: 'headerName',
      headerTooltip: 'OPTIONAL: The header display name, if missing the field name is used. If the field is "name" the displayed value would be "Name"',
      editable: true,
    },
    {
      field: 'width',
      editable: true,
      width: 120,
    },
    {
      field: 'type',
      editable: true,
      width: 120,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['string', 'number', 'boolean', 'date', 'currency', 'checkbox'],
      }
    },
    {
      field: 'order',
      width: 100,
      editable: true,
    },
    {
      field: 'hide',
      editable: true,
      width: 100,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: [true, false],
      }
    },
    {
      field: 'rowDrag',
      editable: true,
      width: 120,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: [true, false],
      }
    },
    {
      field: 'suppressSizeToFit',
      editable: true,
      width: 200,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: [true, false],
      }
    },
  ];

  public defaultColDef: ColDef = {
    flex: 1,
  };

  public style: any = {
    width: '100%',
    height: '100%',
    flex: '1 1 auto',
  };

  getTableNames(): void {
    this.http
      .get(`${environment.apiUrl}table_names`)
      .subscribe({
        next: (response) => {
          this.tableNames = response;
        },
        error: (error) => console.error(error),
      });
  }

  getTableColumns() {
    this.http
      .get<TableInterface[]>(`${environment.apiUrl}table?table_name=${this.selectedTableName}`)
      .subscribe({
        next: (response) => {
          let data = response;
          this.columnData = data;
        },
        error: (error) => console.error(error),
      });
  }

  onSelectionChanged($event: MatSelectChange) {
    if ($event && $event.value) {
      this.selectedTableName = $event.value;
      this.getTableColumns();
    }
  }

  getTableTheme(): string {
    const theme = window.localStorage.getItem("table-theme");
    if (theme)
      return theme.toString();
    return environment.tableTheme;
  }

  reset() {
    this.getTableColumns();
  }

  save() {

    if (!this.columnData || this.columnData.length == 0)
      return;

    this.spinner.show(undefined, {
      type: 'ball-spin',
      size: 'large',
      bdColor: 'rgba(100,149,237, .8)',
      color: 'white',
      fullScreen: false,
    });

    for (let i = 0; i < this.columnData.length; i++) {

      this.http
        .patch(`${environment.apiUrl}table/${this.columnData[i].id}`, this.columnData[i])
        .subscribe({
          error: (error) => console.error(error),
        });

      if (i == this.columnData.length - 1) {
        this.spinner.hide();
      }
    }
    this.openSnackBar("Table");
  }

  onRowDragEnd($event: RowDragEndEvent) {

    let d = $event.api.getRenderedNodes();

    let rows: TableInterface[] = [];

    for (let i = 0; i < d.length; i++) {

      let r = this.columnData.find((r) => r.field == d[i].data.field);

      if (r) {
        r.order = i + 1;
        rows.push(r);
      }
    }
    this.columnData = rows;
  }

  openSnackBar(message: string, action: string = 'Close') {

    const config: MatSnackBarConfig = {
      duration: 4 * 1000,
      horizontalPosition: 'center',
      panelClass: "success-dialog"
    };

    this._snackBar.open(message, action, config);
  }

}
