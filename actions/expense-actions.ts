'use server';

import { getUserAction } from '@/actions/auth-actions';
import { Expense } from '@/types/expense';
import { createClient } from '@/utils/supabase/server';

export const getExpensesAction = async (month?: number, year?: number): Promise<Expense[]> => {
  const supabase = await createClient();
  const user = await getUserAction();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const query = supabase
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

  if (month && year) {
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;

    query
      .gte('date', `${year}-${month.toString().padStart(2, '0')}-01`)
      .lt('date', `${nextYear}-${nextMonth.toString().padStart(2, '0')}-01`);
  } else if (month) {
    const currentYear = new Date().getFullYear();
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? currentYear + 1 : currentYear;

    query
      .gte('date', `${currentYear}-${month.toString().padStart(2, '0')}-01`)
      .lt('date', `${nextYear}-${nextMonth.toString().padStart(2, '0')}-01`);
  } else if (year) {
    query.gte('date', `${year}-01-01`).lt('date', `${year + 1}-01-01`);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data as unknown as Expense[];
};
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

export async function getCategoryExpensesAction(month?: number, year?: number) {
  const supabase = await createClient();
  const user = await getUserAction();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const queryParams: { p_user_id: string; p_month?: number; p_year?: number } = {
    p_user_id: user.id
  };

  if (month) {
    queryParams.p_month = month;
  }

  if (year) {
    queryParams.p_year = year;
  }

  const { data, error } = await supabase.rpc('get_category_expenses', queryParams);

  if (error) {
    console.error('Error fetching category expenses:', error.message);
    throw new Error(error.message);
  }

  return data;
}
