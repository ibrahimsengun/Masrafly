'use server';

import { AddSourceButton } from '@/components/add-source-button';
import { SourcesList } from '@/components/sources-list';

export default async function SourcesPage() {
  return (
    <div className="grid grid-cols-2 w-full spa">
      <SourcesList />
      <div className="self-end justify-self-end">
        <AddSourceButton />
      </div>
    </div>
  );
}
