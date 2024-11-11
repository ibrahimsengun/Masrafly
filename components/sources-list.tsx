'use client';

import { useSource } from '@/context/source-context';

export const SourcesList = () => {
  const { sources } = useSource();
  return (
    <div className="flex flex-col gap-2">
      {sources.map((source) => (
        <div className="flex flex-row gap-4" key={source.id}>
          <span>{source.name}</span>
          <span>{source.balance}</span>
        </div>
      ))}
    </div>
  );
};
