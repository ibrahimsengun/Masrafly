'use server';

import { getUserAction } from '@/actions/auth-actions';
import { Preferences } from '@/types/preferences';
import { createClient } from '@/utils/supabase/server';

export const getPreferencesAction = async (): Promise<Preferences> => {
  const supabase = await createClient();
  const user = await getUserAction();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // Mevcut tercihleri kontrol et
  const { data: preferences, error } = await supabase
    .from('preferences')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (preferences) {
    return preferences;
  }

  // Eğer yoksa varsayılan bir kayıt oluştur
  const { data: newPreferences, error: insertError } = await supabase
    .from('preferences')
    .insert({
      user_id: user.id,
      currency: 'USD',
      number_format: 'comma',
      decimal_length: 2,
      track_sources: true
    } as Preferences)
    .select()
    .single();

  if (insertError) {
    throw new Error(insertError.message);
  }

  return newPreferences;
};

export const updatePreferencesAction = async (preferences: Partial<Preferences>): Promise<void> => {
  const supabase = await createClient();
  const user = await getUserAction();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { error } = await supabase.from('preferences').update(preferences).eq('user_id', user.id);

  if (error) {
    throw new Error(error.message);
  }
};
