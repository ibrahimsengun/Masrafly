'use client';

import { getPreferencesAction, updatePreferencesAction } from '@/actions/preferences-actions';
import { Preferences } from '@/types/preferences';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface PreferencesContextType {
  preferences: Preferences;
  updatePreferences: (updates: Partial<Preferences>) => Promise<void>;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider = ({
  children,
  initialPreferences
}: {
  children: ReactNode;
  initialPreferences: Preferences;
}) => {
  const [preferences, setPreferences] = useState<Preferences>(initialPreferences);

  useEffect(() => {
    async function fetchPreferences() {
      try {
        const data = await getPreferencesAction();
        setPreferences(data);
      } catch (error) {
        console.error('Failed to fetch preferences:', error);
      }
    }

    fetchPreferences();
  }, []);

  const updatePreferences = async (updates: Partial<Preferences>) => {
    try {
      await updatePreferencesAction(updates);
      setPreferences((prev) => ({ ...prev, ...updates }));
    } catch (error) {
      console.error('Failed to update preferences:', error);
      throw error;
    }
  };

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferencesContext must be used within a PreferencesProvider');
  }
  return context;
};
