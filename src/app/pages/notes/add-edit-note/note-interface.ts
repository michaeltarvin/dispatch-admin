export interface NoteInterface {
  id?: number;
  title: string;
  request: string;
  response: string;
  from_user: string;
  to_user: string;
  is_closed: boolean;
  created_at: Date;
}
