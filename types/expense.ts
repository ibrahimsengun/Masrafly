export interface Expense {
  id: string;
  user_id: string;
  amount: number;
  description: string | null;
  date: string;
  created_at: string;
  category: { id: string; name: string; color: string } | null;
  source: { id: string; name: string; balance: number } | null;
}

export interface ExpenseByCategory {
  category_name: string;
  category_color: string;
  total_expense: number;
}
