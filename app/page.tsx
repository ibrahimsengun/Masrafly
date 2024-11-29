import Landing from '@/components/landing';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Index() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (user) {
    return redirect('/dashboard');
  }
  return <Landing />;
}
