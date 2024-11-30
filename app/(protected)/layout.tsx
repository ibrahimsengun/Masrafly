import { getCategoriesAction } from '@/actions/category-actions';
import { getPreferencesAction } from '@/actions/preferences-actions';
import { getSourcesAction } from '@/actions/source-actions';
import { CategoryProvider } from '@/context/category-context';
import { PreferencesProvider } from '@/context/preferences-context';
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
  const sources = await getSourcesAction();
  const categories = await getCategoriesAction();
  const preferences = await getPreferencesAction();

  return (
    <PreferencesProvider initialPreferences={preferences}>
      <SourceProvider initialSources={sources}>
        <CategoryProvider initialCategories={categories}>{children}</CategoryProvider>
      </SourceProvider>
    </PreferencesProvider>
  );
}
