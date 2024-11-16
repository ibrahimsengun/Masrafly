// actions/expense-actions.ts
'use server';

import { getUserAction } from '@/actions/auth-actions';
import { Expense } from '@/types/expense';
import { createClient } from '@/utils/supabase/server';

// Harcamaları listeleme (Tüm bilgileriyle birlikte)
export const getExpensesAction = async (): Promise<Expense[]> => {
  const supabase = await createClient();
  const user = await getUserAction();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('expenses')
    .select(
      `
      id,
      amount,
      description,
      date,
      created_at,
      category: categories ( id, name, color ),
      source: sources ( id, name, balance )
    `
    )
    .eq('user_id', user.id)
    .order('date', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as unknown as Expense[];
};

// Yeni harcama ekleme
export const addExpenseAction = async (
  amount: number,
  description: string | null,
  date: string,
  categoryId: string | null,
  sourceId: string | null
): Promise<Expense> => {
  const supabase = await createClient();
  const user = await getUserAction();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase.from('expenses').insert({
    user_id: user.id,
    amount,
    description,
    date,
    category_id: categoryId,
    source_id: sourceId
  });

  if (error) {
    throw new Error(error.message);
  }

  return data as unknown as Expense;
};

// Belirli bir harcamayı güncelleme
export const updateExpenseAction = async (
  expenseId: string,
  amount?: number,
  description?: string | null,
  date?: string,
  categoryId?: string | null,
  sourceId?: string | null
): Promise<Expense> => {
  const supabase = await createClient();
  const user = await getUserAction();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const updates = {
    ...(amount !== undefined && { amount }),
    ...(description !== undefined && { description }),
    ...(date !== undefined && { date }),
    ...(categoryId !== undefined && { category_id: categoryId }),
    ...(sourceId !== undefined && { source_id: sourceId })
  };

  const { data, error } = await supabase
    .from('expenses')
    .update(updates)
    .eq('id', expenseId)
    .eq('user_id', user.id);

  if (error) {
    throw new Error(error.message);
  }

  return data as unknown as Expense;
};

// Belirli bir harcamayı silme
export const deleteExpenseAction = async (expenseId: string): Promise<void> => {
  const supabase = await createClient();
  const user = await getUserAction();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', expenseId)
    .eq('user_id', user.id);

  if (error) {
    throw new Error(error.message);
  }
};

export async function getCategoryExpensesAction() {
  const supabase = await createClient();
  const user = await getUserAction();
  const { data, error } = await supabase.rpc('get_category_expenses', { p_user_id: user.id });

  if (error) {
    console.error('Error fetching category expenses:', error.message);
    throw new Error(error.message);
  }

  return data;
}
