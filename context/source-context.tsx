'use client';

import {
  addSourceAction,
  deleteSourceAction,
  getSourcesAction,
  updateSourceAction
} from '@/actions/source-actions';
import { Source } from '@/types/source';
import { createContext, ReactNode, useContext, useState } from 'react';

interface SourceContextType {
  sources: Source[];
  setSources: (sources: Source[]) => void;
  refreshSources: () => Promise<void>;
  addSource: (name: string, balance: number) => Promise<void>;
  updateSource: (id: string, name: string, balance: number) => Promise<void>;
  deleteSource: (id: string) => Promise<void>;
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
      const updatedSources = await getSourcesAction();
      setSources(updatedSources);
    } catch (error) {
      console.error('Failed to refresh sources:', error);
    }
  };

  const addSource = async (name: string, balance: number) => {
    try {
      await addSourceAction(name, balance);
      refreshSources();
    } catch (error) {
      console.error('Failed to add source:', error);
    }
  };

  const updateSource = async (id: string, name: string, balance: number) => {
    try {
      await updateSourceAction(id, name, balance);
      refreshSources();
    } catch (error) {
      console.error('Failed to add source:', error);
    }
  };

  const deleteSource = async (id: string) => {
    try {
      await deleteSourceAction(id);
      refreshSources();
    } catch (error) {
      console.error('Failed to refresh sources:', error);
    }
  };

  return (
    <SourceContext.Provider
      value={{ sources, setSources, refreshSources, addSource, updateSource, deleteSource }}
    >
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
