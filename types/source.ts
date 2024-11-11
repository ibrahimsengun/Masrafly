export interface Source {
  id: string;
  user_id: string;
  name: string;
  balance: number;
  created_at: string;
}

export interface SourcesError {
  message: string;
}
