export interface CustomerInterface {
  id?: number;
  name: string;
  email: string;
  alias?: string;
  type_id?: number;
  is_active: boolean;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  bill_address?: string;
  bill_city?: string;
  bill_state?: string;
  bill_zip?: string;
  office?: string;
  fax?: string;
  cell?: string;
  bond?: string;
  url?: string;
}
