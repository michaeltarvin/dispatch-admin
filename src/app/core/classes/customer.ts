export interface Customer {
  id: number;
  name: string;
  alias: string | null;
  email: string;
  type_id: number;
  is_active: boolean;
  address: string;
  city: string;
  state: string;
  zip: string;
  bill_address: string | null;
  bill_city: string | null;
  bill_state: string | null;
  bill_zip: string | null;
  office: string | null;
  fax: string | null;
  cell: string;
  bond: string | null;
  url: string | null;
  created_at: string | null;
  updated_at: string | null;
  type?: CustomerType | null;
}

export interface CustomerType {
  id: number;
  name: string;
  description: string | null;
  is_shipper: boolean;
  is_biller: boolean;
  is_receiver: boolean;
  created_at: string | null;
  updated_at: string | null;
}
