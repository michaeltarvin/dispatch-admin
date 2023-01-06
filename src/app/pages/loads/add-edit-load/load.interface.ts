export interface LoadInterface {
  id?: number;
  trip_id: number;
  is_dispatched: boolean;
  is_brokerage: boolean;
  is_paid_for: boolean;
  pudate?: string;
  deldate?: string;
  notes: string;
  notes1: string;
  type: string;
  subtype: string;

  paid_on?: Date;
  datepaid?: Date;
  invoiced_date?: Date;

  shipper_id: number;
  billto_id: number;
  driver_id: number;
  receiver_id: number;

  allmoney: number;
  remaining_balance: number;
  total: number;
  misc: number;

  rate: number;
  lumper: number;
  unload: number;
  exten: number;

  fuelpaid: number;
  fuelsc: number;
  detention: number;
  layover: number;
}

    // "punum": "",
    // "bolnum": "",
    // "broker": "",
    // "weight": "",
    // "chrwnum": "",
    // "subnum": "",
    // "schedule": "",
    // "confirmation": "",
    // "trucknum": "",
    // "trailernum": "",
    // "linked_load_count": 0,
