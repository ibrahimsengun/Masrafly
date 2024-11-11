'use client';

import { Source } from '@/types/source';
import { createContext, ReactNode, useContext, useState } from 'react';

interface SourceContextType {
  sources: Source[];
  setSources: (sources: Source[]) => void;
  refreshSources: () => Promise<void>;
}
const SourceContext = createContext<SourceContextType | undefined>(undefined);

export const SourceProvider = ({
  children,
  initialSources
}: {
  children: ReactNode;
  initialSources: Source[];
}) => {
  const [sources, setSources] = useState<Source[]>(initialSources);

  const refreshSources = async () => {
    try {
      const response = await fetch('/api/refresh-sources');
      const updatedSources = await response.json();
      setSources(updatedSources);
    } catch (error) {
      console.error('Failed to refresh sources:', error);
    }
  };

  return (
    <SourceContext.Provider value={{ sources, setSources, refreshSources }}>
      {children}
    </SourceContext.Provider>
  );
};

export const useSource = () => {
  const context = useContext(SourceContext);
  if (!context) {
    throw new Error('useSourceContext must be used within a SourceProvider');
  }
  return context;
};
