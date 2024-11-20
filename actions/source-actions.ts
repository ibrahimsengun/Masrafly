'use server';

import { Source } from '@/types/source';
import { createClient } from '@/utils/supabase/server';
import { getUserAction } from './auth-actions';

export const addSourceAction = async (name: string, balance: number): Promise<Source> => {
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

export const getSourcesAction = async (): Promise<Source[]> => {
  const supabase = await createClient();
  const user = await getUserAction();

  const { data, error } = await supabase
    .from('sources')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data as Source[];
};

export const updateSourceAction = async (
  sourceId: string,
  newName: string,
  newBalance: number
): Promise<void> => {
  const supabase = await createClient();

  const { error } = await supabase
    .from('sources')
    .update({ balance: newBalance, name: newName })
    .eq('id', sourceId);

  if (error) {
    throw new Error(error.message);
  }
};

export const deleteSourceAction = async (id: string): Promise<void> => {
  const supabase = await createClient();
  const user = await getUserAction();

  const { error } = await supabase.from('sources').delete().eq('id', id).eq('user_id', user.id);

  if (error) {
    throw new Error(error.message);
  }
};
