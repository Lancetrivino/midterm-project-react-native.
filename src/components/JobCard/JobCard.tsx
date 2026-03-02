import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useJobs } from '../../context/JobContext';
import { Job } from '../../types';
import { createStyles } from './JobCard.styles';

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
  showRemoveButton?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApply, showRemoveButton = false }) => {
  const { theme } = useTheme();
  const { saveJob, removeSavedJob, isJobSaved, hasApplied } = useJobs();
  const styles = createStyles(theme);

  const isSaved = isJobSaved(job.id);
  const isApplied = hasApplied(job.id);

  // Animated press scale for card
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const saveScaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handleSaveToggle = () => {
    // Bounce animation on save
    Animated.sequence([
      Animated.spring(saveScaleAnim, {
        toValue: 1.3,
        useNativeDriver: true,
        speed: 50,
        bounciness: 10,
      }),
      Animated.spring(saveScaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50,
        bounciness: 5,
      }),
    ]).start();

    if (showRemoveButton) {
      removeSavedJob(job.id);
    } else {
      saveJob(job);
    }
  };

  const getTypeColor = (type?: string) => {
    if (!type) return theme.primary;
    const t = type.toLowerCase();
    if (t.includes('full')) return '#10B981';
    if (t.includes('part')) return '#F59E0B';
    if (t.includes('contract')) return '#8B5CF6';
    if (t.includes('remote')) return '#3B82F6';
    return theme.primary;
  };

  const typeColor = getTypeColor(job.type);

  return (
    <Animated.View style={[styles.cardWrapper, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.card}
      >
        {/* Top accent bar */}
        <View style={[styles.accentBar, { backgroundColor: typeColor }]} />

        {/* Header Row */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            {job.companyLogo ? (
              <Image
                source={{ uri: job.companyLogo }}
                style={styles.logo}
                resizeMode="contain"
              />
            ) : (
              <View style={[styles.logoPlaceholder, { backgroundColor: typeColor + '20' }]}>
                <Text style={[styles.logoInitial, { color: typeColor }]}>
                  {job.company?.charAt(0)?.toUpperCase() ?? '?'}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.titleBlock}>
            <Text style={styles.title} numberOfLines={2}>
              {job.title}
            </Text>
            <Text style={styles.company}>{job.company}</Text>
          </View>

          <Animated.View style={{ transform: [{ scale: saveScaleAnim }] }}>
            <TouchableOpacity
              style={[
                styles.bookmarkButton,
                (isSaved || showRemoveButton) && styles.bookmarkButtonActive,
              ]}
              onPress={handleSaveToggle}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name={showRemoveButton ? 'trash-outline' : isSaved ? 'bookmark' : 'bookmark-outline'}
                size={20}
                color={isSaved || showRemoveButton ? '#fff' : theme.textSecondary}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Tags Row */}
        <View style={styles.tagsRow}>
          {job.type && (
            <View style={[styles.tag, { backgroundColor: typeColor + '18', borderColor: typeColor + '40' }]}>
              <View style={[styles.tagDot, { backgroundColor: typeColor }]} />
              <Text style={[styles.tagText, { color: typeColor }]}>{job.type}</Text>
            </View>
          )}
          {job.location && (
            <View style={styles.tag}>
              <Ionicons name="location-outline" size={12} color={theme.textSecondary} />
              <Text style={styles.tagTextMuted}>{job.location}</Text>
            </View>
          )}
          {job.salary && (
            <View style={styles.tag}>
              <Ionicons name="cash-outline" size={12} color={theme.textSecondary} />
              <Text style={styles.tagTextMuted}>{job.salary}</Text>
            </View>
          )}
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Description */}
        {job.description && (
          <Text style={styles.description} numberOfLines={3}>
            {job.description}
          </Text>
        )}

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.applyButton, isApplied && styles.applyButtonDone]}
            onPress={() => onApply(job)}
            disabled={isApplied}
            activeOpacity={0.85}
          >
            <Ionicons
              name={isApplied ? 'checkmark-circle' : 'arrow-forward-circle-outline'}
              size={20}
              color="#fff"
            />
            <Text style={styles.applyButtonText}>
              {isApplied ? 'Applied' : 'Apply Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};