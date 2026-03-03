import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { usePreferences } from '../../context/PreferencesContext';
import { createStyles } from './OnboardingScreen.styles';

export const OnboardingScreen: React.FC = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { completeOnboarding } = usePreferences();

  const handleContinue = () => {
    completeOnboarding();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      {/* company logo – ensure file name matches exactly */}
      <Image
        source={require('../../../assets/Job_finder_logo.png')}
        style={styles.illustration}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to Job Finder</Text>
      <Text style={styles.subtitle}>
        Search and save jobs with ease. Let&apos;s get started!
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};