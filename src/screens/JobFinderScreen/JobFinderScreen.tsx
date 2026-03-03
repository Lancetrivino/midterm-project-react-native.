// updated JobFinderScreen
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useJobs } from '../../context/JobContext';
import { Job } from '../../types';
import { fetchJobs } from '../../services/api';
import { JobCard } from '../../components/JobCard/JobCard';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { ApplicationForm } from '../../components/ApplicationForm/ApplicationForm';
import { ThemeToggle } from '../../components/ThemeToggle/ThemeToggle';
import { createStyles } from './JobFinderScreen.styles';

export const JobFinderScreen: React.FC = () => {
  const { theme } = useTheme();
  const { jobs, setJobs } = useJobs();
  const styles = createStyles(theme);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const loadJobs = async () => {
    try {
      setError(null);
      const fetchedJobs = await fetchJobs();
      setJobs(fetchedJobs);

      // Animate content in
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]).start();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fadeAnim.setValue(0);
    slideAnim.setValue(10);
    loadJobs();
  };

  const filteredJobs = useMemo(() => {
    if (!searchQuery.trim()) return jobs;
    const query = searchQuery.toLowerCase().trim();
    return jobs.filter(
      (job) =>
        job.title?.toLowerCase().includes(query) ||
        job.company?.toLowerCase().includes(query) ||
        job.location?.toLowerCase().includes(query) ||
        job.type?.toLowerCase().includes(query)
    );
  }, [jobs, searchQuery]);

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const Header = () => (
    <View style={[styles.header, { backgroundColor: theme.surface }]}>
      <View>
        <Text style={styles.headerEyebrow}>Welcome To</Text>
        <Text style={styles.headerTitle}>Job Finder</Text>
      </View>
      <ThemeToggle />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={(theme as any).primary} />
          <Text style={styles.loadingText}>Fetching opportunities...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.errorContainer}>
          <View style={styles.errorIconContainer}>
            <Ionicons name="cloud-offline-outline" size={48} color={theme.textSecondary} />
          </View>
          <Text style={styles.errorTitle}>Couldn't Load Jobs</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadJobs} activeOpacity={0.85}>
            <Ionicons name="refresh" size={18} color="#fff" />
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />

      {/* Stats bar */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{jobs.length}</Text>
          <Text style={styles.statLabel}>Available</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{filteredJobs.length}</Text>
          <Text style={styles.statLabel}>Showing</Text>
        </View>
        {/* Remote stat removed - not provided by API */}
      </View>

      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          resultCount={searchQuery ? filteredJobs.length : undefined}
        />

        {filteredJobs.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="search-outline" size={36} color={theme.textSecondary} />
            </View>
            <Text style={styles.emptyTitle}>No results found</Text>
            <Text style={styles.emptyMessage}>
              {searchQuery.trim()
                ? `No jobs matching "${searchQuery}"`
                : 'No jobs available right now'}
            </Text>
            {searchQuery ? (
              <TouchableOpacity
                style={styles.clearSearchButton}
                onPress={() => setSearchQuery('')}
              >
                <Text style={styles.clearSearchText}>Clear Search</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : (
          <FlatList
            data={filteredJobs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <JobCard job={item} onApply={handleApply} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={(theme as any).primary}
              />
            }
          />
        )}
      </Animated.View>

      <ApplicationForm
        visible={showApplicationForm}
        job={selectedJob}
        onClose={() => setShowApplicationForm(false)}
      />
    </View>
  );
};