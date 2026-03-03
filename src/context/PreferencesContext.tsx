import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PreferencesContextType {
  onboardingCompleted: boolean;
  completeOnboarding: () => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  const completeOnboarding = () => {
    setOnboardingCompleted(true);
  };

  return (
    <PreferencesContext.Provider value={{ onboardingCompleted, completeOnboarding }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = (): PreferencesContextType => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within PreferencesProvider');
  }
  return context;
};