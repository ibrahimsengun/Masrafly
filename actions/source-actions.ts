// actions/sourceActions.ts
'use server';

import { Source } from '@/types/source';
import { createClient } from '@/utils/supabase/server';
import { getUserAction } from './auth-actions';

export const addSource = async (name: string, balance: number): Promise<Source> => {
  const supabase = await createClient();
  const user = await getUserAction();

  const { data, error } = await supabase
    .from('sources')
    .insert([{ user_id: user.id, name, balance }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Source;
};

export const getSources = async (): Promise<Source[]> => {
  const supabase = await createClient();
  const user = await getUserAction();

  const { data, error } = await supabase
    .from('sources')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as Source[];
};

export const updateSourceBalance = async (sourceId: string, newBalance: number): Promise<void> => {
  const supabase = await createClient();

  const { error } = await supabase
    .from('sources')
    .update({ balance: newBalance })
    .eq('id', sourceId);

  if (error) {
    throw new Error(error.message);
  }
};
