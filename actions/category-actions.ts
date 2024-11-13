'use server';

import { Category } from '@/types/category';
import { createClient } from '@/utils/supabase/server';
import { getUserAction } from './auth-actions';

const defaultCategories = [
  { name: 'Food', color: '#FF6347' },
  { name: 'Transport', color: '#4682B4' },
  { name: 'Utilities', color: '#FFD700' },
  { name: 'Entertainment', color: '#8A2BE2' }
];

export const addDefaultCategoriesAction = async () => {
  const supabase = await createClient();
  const user = await getUserAction();

  const categoriesToInsert = defaultCategories.map((category) => ({
    user_id: user.id,
    name: category.name,
    color: category.color
  }));

  const { error } = await supabase.from('categories').insert(categoriesToInsert);

  if (error) {
    throw new Error('Failed to add default categories: ' + error.message);
  }
};

export const addCategoryAction = async (name: string, color: string): Promise<Category> => {
  const supabase = await createClient();
  const user = await getUserAction();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('categories')
    .insert([{ user_id: user.id, name, color }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Category;
};

export const getCategoriesAction = async (): Promise<Category[]> => {
  const supabase = await createClient();
  const user = await getUserAction();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as Category[];
};

export const deleteCategoryAction = async (categoryId: string): Promise<void> => {
  const supabase = await createClient();
  const user = await getUserAction();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', categoryId)
    .eq('user_id', user.id);

  if (error) {
    throw new Error(error.message);
  }
};

export const updateCategoryAction = async (
  categoryId: string,
  name?: string,
  color?: string
): Promise<Category> => {
  const supabase = await createClient();
  const user = await getUserAction();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const updates: Partial<Category> = {};
  if (name) updates.name = name;
  if (color) updates.color = color;

  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', categoryId)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Category;
};
