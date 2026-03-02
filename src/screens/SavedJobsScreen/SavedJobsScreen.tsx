import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useJobs } from '../../context/JobContext';
import { Job } from '../../types';
import { JobCard } from '../../components/JobCard/JobCard';
import { ApplicationForm } from '../../components/ApplicationForm/ApplicationForm';
import { ThemeToggle } from '../../components/ThemeToggle/ThemeToggle';
import { createStyles } from './SavedJobsScreen.styles';

export const SavedJobsScreen: React.FC = () => {
  const { theme } = useTheme();
  const { savedJobs } = useJobs();
  const navigation = useNavigation();
  const styles = createStyles(theme);

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleSuccessFromSaved = () => {
    navigation.navigate('JobFinder' as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerEyebrow}>Your list</Text>
          <Text style={styles.headerTitle}>Saved Jobs</Text>
        </View>
        <View style={styles.headerRight}>
          {savedJobs.length > 0 && (
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{savedJobs.length}</Text>
            </View>
          )}
          <ThemeToggle />
        </View>
      </View>

      <View style={styles.content}>
        {savedJobs.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Ionicons
                name="bookmark-outline"
                size={40}
                color={theme.textSecondary}
              />
            </View>
            <Text style={styles.emptyTitle}>No saved jobs yet</Text>
            <Text style={styles.emptyMessage}>
              Tap the bookmark icon on any job listing to save it here for quick access later.
            </Text>
          </View>
        ) : (
          <FlatList
            data={savedJobs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <JobCard job={item} onApply={handleApply} showRemoveButton />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <ApplicationForm
        visible={showApplicationForm}
        job={selectedJob}
        onClose={() => setShowApplicationForm(false)}
        fromSavedJobs
        onSuccessFromSaved={handleSuccessFromSaved}
      />
    </View>
  );
};