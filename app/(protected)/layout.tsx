import { getSources } from '@/actions/source-actions';
import { SourceProvider } from '@/context/source-context';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }
  const sources = await getSources();
  console.log({ sources });
  return <SourceProvider initialSources={sources}>{children}</SourceProvider>;
}
