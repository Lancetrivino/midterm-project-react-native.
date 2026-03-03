import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useJobs } from '../../context/JobContext';
import { ThemeToggle } from '../../components/ThemeToggle/ThemeToggle';
import { Application } from '../../types';
import { createStyles } from './AppliedJobsScreen.styles';

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const formatTime = (date: Date): string => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

interface ApplicationCardProps {
  application: Application;
  styles: any;
  theme: any;
  onRemove: (jobId: string) => void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application, styles, theme, onRemove }) => {
  const { jobs } = useJobs();
  const job = jobs.find((j) => j.id === application.jobId);

  const handleCancel = () => {
    Alert.alert(
      'Cancel Application',
      `Are you sure you want to cancel your application for ${job?.title}?`,
      [
        { text: 'Keep It', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => onRemove(application.jobId),
        },
      ]
    );
  };

  const typeColor = '#10B981'; // success green for applied

  return (
    <View style={styles.card}>
      <View style={styles.accentBar} />
      <View style={styles.cardBody}>
        {/* Header */}
        <View style={styles.cardHeader}>
          {job?.companyLogo ? (
            <Image source={{ uri: job.companyLogo }} style={styles.logo} resizeMode="contain" />
          ) : (
            <View style={[styles.logoPlaceholder, { backgroundColor: typeColor + '20' }]}>
              <Text style={[styles.logoInitial, { color: typeColor }]}>
                {(job?.company ?? application.name)?.charAt(0)?.toUpperCase() ?? '?'}
              </Text>
            </View>
          )}

          <View style={styles.titleBlock}>
            <Text style={styles.jobTitle} numberOfLines={1}>
              {job?.title ?? 'Job Position'}
            </Text>
            <Text style={styles.company}>{job?.company ?? 'Company'}</Text>
          </View>

          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Applied</Text>
          </View>
        </View>

        {/* Meta info */}
        <View style={styles.metaRow}>
          {job?.location && (
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={13} color={theme.textSecondary} />
              <Text style={styles.metaText}>{job.location}</Text>
            </View>
          )}
          {job?.type && (
            <View style={styles.metaItem}>
              <Ionicons name="briefcase-outline" size={13} color={theme.textSecondary} />
              <Text style={styles.metaText}>{job.type}</Text>
            </View>
          )}
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={13} color={theme.textSecondary} />
            <Text style={styles.metaText}>{formatDate(application.appliedDate)}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={13} color={theme.textSecondary} />
            <Text style={styles.metaText}>{formatTime(application.appliedDate)}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={[styles.divider, { marginTop: 14 }]} />

        {/* Applicant details */}
        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Name</Text>
            <Text style={styles.detailValue}>{application.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue} numberOfLines={1}>{application.email}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Phone</Text>
            <Text style={styles.detailValue}>{application.contactNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Cover</Text>
            <Text style={styles.detailValue} numberOfLines={2}>{application.whyHireYou}</Text>
          </View>
        </View>

        {/* Cancel button */}
        <View style={[styles.divider, { marginBottom: 12 }]} />
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel} activeOpacity={0.85}>
          <Ionicons name="trash-outline" size={16} color={(theme as any).danger ?? '#EF4444'} />
          <Text style={styles.cancelButtonText}>Cancel Application</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const AppliedJobsScreen: React.FC = () => {
  const { theme } = useTheme();
  const { applications, jobs, removeApplication } = useJobs();
  const styles = createStyles(theme);

  // Sort newest first
  const sortedApplications = [...applications].sort(
    (a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
  );

  // Unique companies applied to
  const uniqueCompanies = new Set(
    applications.map((app) => {
      const job = jobs.find((j) => j.id === app.jobId);
      return job?.company;
    })
  ).size;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerEyebrow}>Your history</Text>
          <Text style={styles.headerTitle}>Applications</Text>
        </View>
        <View style={styles.headerRight}>
          {applications.length > 0 && (
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{applications.length}</Text>
            </View>
          )}
          <ThemeToggle />
        </View>
      </View>

      {/* Stats bar */}
      {applications.length > 0 && (
        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{applications.length}</Text>
            <Text style={styles.statLabel}>Applied</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: (theme as any).primary }]}>
              {uniqueCompanies}
            </Text>
            <Text style={styles.statLabel}>Companies</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: (theme as any).success ?? '#10B981' }]}>
              {applications.length > 0
                ? Math.round((applications.length / Math.max(jobs.length, 1)) * 100)
                : 0}%
            </Text>
            <Text style={styles.statLabel}>Apply Rate</Text>
          </View>
        </View>
      )}

      {/* List */}
      <View style={styles.content}>
        {sortedApplications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="paper-plane-outline" size={40} color={theme.textSecondary} />
            </View>
            <Text style={styles.emptyTitle}>No applications yet</Text>
            <Text style={styles.emptyMessage}>
              Once you apply to jobs, they'll show up here with all your submission details.
            </Text>
          </View>
        ) : (
          <FlatList
            data={sortedApplications}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <ApplicationCard
                application={item}
                styles={styles}
                theme={theme}
                onRemove={removeApplication}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};