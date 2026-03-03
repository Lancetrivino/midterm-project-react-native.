import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider } from './src/context/ThemeContext';
import { JobProvider } from './src/context/JobContext';
import { PreferencesProvider, usePreferences } from './src/context/PreferencesContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { OnboardingScreen } from './src/screens/OnboardingScreen/OnboardingScreen';

const Root: React.FC = () => {
  const { onboardingCompleted } = usePreferences();

  return onboardingCompleted ? (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  ) : (
    <OnboardingScreen />
  );
};

const App: React.FC = () => (
  <ThemeProvider>
    <PreferencesProvider>
      <JobProvider>
        <Root />
      </JobProvider>
    </PreferencesProvider>
  </ThemeProvider>
);

export default App;
