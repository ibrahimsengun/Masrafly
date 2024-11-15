export interface Expense {
  id: string;
  user_id: string;
  category_id: string | null;
  source_id: string | null;
  amount: number;
  description: string | null;
  date: string;
  created_at: string;
  category: { name: string; color: string } | null;
  source: { name: string; balance: number } | null;
}
