'use server';

import { createClient } from '@/utils/supabase/server';
import { encodedRedirect } from '@/utils/utils';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const getUserAction = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error(authError?.message || 'User not authenticated');
  }
  return user;
};

export const signInWithGoogleAction = async () => {
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`
    }
  });

  if (error) {
    return encodedRedirect('error', '/sign-in', error.message);
  }
  if (data.url) {
    return redirect(data.url);
  }
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect('/');
};

// not use right now but maybe?
export const signUpAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`
    }
  });

  if (error) {
    console.error(error.code + ' ' + error.message);
    return encodedRedirect('error', '/sign-up', error.message);
  } else {
    return encodedRedirect(
      'success',
      '/sign-up',
      'Thanks for signing up! Please check your email for a verification link.'
    );
  }
};

// not use right now but maybe?
export const signInAction = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return encodedRedirect('error', '/sign-in', error.message);
  }

  return redirect('/');
};
