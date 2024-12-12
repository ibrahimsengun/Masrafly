import { ArrowDown, ArrowUp, CalendarArrowDown, CalendarArrowUp } from 'lucide-react';

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

export interface Filter {
  selectedCategoryIds?: string[];
  selectedSourceIds?: string[];
  minAmount?: number;
  maxAmount?: number;
}

export enum OrderEnum {
  DateNew = 'date-new',
  DateOld = 'date-old',
  AmountAsc = 'amount-asc',
  AmountDesc = 'amount-desc'
}

export const orderOptions = [
  { value: OrderEnum.DateNew, label: 'Newest', icon: CalendarArrowUp },
  { value: OrderEnum.DateOld, label: 'Oldest', icon: CalendarArrowDown },
  { value: OrderEnum.AmountAsc, label: 'Amount Asc.', icon: ArrowUp },
  { value: OrderEnum.AmountDesc, label: 'Amount Desc.', icon: ArrowDown }
];
