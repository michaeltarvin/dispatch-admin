export interface DriverInterface {
  id?: number;
  name: string;
  type_id: number;
  email: string;
  company?: string;
  is_active: boolean;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  office?: string;
  fax?: string;
  cell?: string;

  license?: Date;
  insurance?: Date;
  w9date?: Date;
  packet?: Date;
  drugtest?: Date;
  workcomp?: Date;
  workcompna?: Date;
  mcnumber?: string;
  canumber?: string;
}
