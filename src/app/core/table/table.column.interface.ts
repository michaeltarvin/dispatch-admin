export interface TableInterface {
  id?: number;
  table_name: string;
  field: string;
  headerName: string;
  type: string;
  order: number;
  width: number;
  rowDrag: boolean;
  hide: boolean;
  suppressSizeToFit: boolean;
}
