'use server';

import { SourcesList } from '@/components/sources-list';

export default async function SourcesPage() {
  return (
    <div>
      <SourcesList />
    </div>
  );
}
