export interface Preferences {
  id: string;
  user_id: string;
  currency: string;
  number_format: 'comma' | 'dot';
  decimal_length: number;
  track_sources: boolean;
  created_at: string;
  updated_at: string;
}

export enum CurrencyCode {
  TRY = 'tr-TR',
  USD = 'en-US',
  EUR = 'de-DE',
  GBP = 'en-GB',
  JPY = 'ja-JP'
}
