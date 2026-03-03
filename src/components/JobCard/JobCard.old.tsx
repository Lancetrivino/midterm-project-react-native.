import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../context/ThemeContext';
import { useJobs } from '../../context/JobContext';
import { Job } from '../../types';
import { createStyles } from './JobCard.styles';

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
  showRemoveButton?: boolean;
  isPreferred?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onApply,
  showRemoveButton = false,
  isPreferred = false,
}) => {
  const { theme } = useTheme();
  const { saveJob, removeSavedJob, isJobSaved, hasApplied } = useJobs();
  const styles = createStyles(theme);

  const isSaved = isJobSaved(job.id);
  const isApplied = hasApplied(job.id);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const saveScaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.98, useNativeDriver: true, speed: 50, bounciness: 4 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 50, bounciness: 4 }).start();
  };

  const handleSave = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Animated.sequence([
      Animated.spring(saveScaleAnim, { toValue: 1.2, useNativeDriver: true, speed: 50, bounciness: 10 }),
      Animated.spring(saveScaleAnim, { toValue: 1, useNativeDriver: true, speed: 50, bounciness: 5 }),
    ]).start();
    saveJob(job);
  };

  const handleRemove = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    removeSavedJob(job.id);
  };

  const handleApplyPress = () => {
    if (!isApplied) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onApply(job);
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
  const primaryColor = (theme as any).primary;

  return (
    <Animated.View style={[styles.cardWrapper, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.card}
      >
        {/* Accent bar */}
        <View style={[styles.accentBar, { backgroundColor: typeColor }]} />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            {job.companyLogo ? (
              <Image source={{ uri: job.companyLogo }} style={styles.logo} resizeMode="contain" />
            ) : (
              <View style={[styles.logoPlaceholder, { backgroundColor: typeColor + '20' }]}>
                <Text style={[styles.logoInitial, { color: typeColor }]}>
                  {job.company?.charAt(0)?.toUpperCase() ?? '?'}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.titleBlock}>
            <Text style={styles.title} numberOfLines={2}>{job.title}</Text>
            <Text style={styles.company}>{job.company}</Text>
          </View>
        </View>

        {/* Tags */}
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
          {isPreferred && (
            <View style={[styles.tag, { backgroundColor: primaryColor + '18', borderColor: primaryColor + '40' }]}>
              <Ionicons name="star" size={11} color={primaryColor} />
              <Text style={[styles.tagText, { color: primaryColor }]}>Matches You</Text>
            </View>
          )}
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Description */}
        {job.description && (
          <Text style={styles.description} numberOfLines={3}>{job.description}</Text>
        )}

        {/* Action Buttons */}
        <View style={styles.buttonRow}>

          {/* LEFT button: "Save Job" / "Saved" on finder | "Remove" on saved screen */}
          {showRemoveButton ? (
            <Animated.View style={[{ flex: 1 }, { transform: [{ scale: saveScaleAnim }] }]}>
              <TouchableOpacity style={styles.removeButton} onPress={handleRemove} activeOpacity={0.8}>
                <Ionicons name="trash-outline" size={16} color={(theme as any).danger ?? '#EF4444'} />
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <Animated.View style={[{ flex: 1 }, { transform: [{ scale: saveScaleAnim }] }]}>
              <TouchableOpacity
                style={[styles.saveButton, isSaved && styles.saveButtonActive]}
                onPress={handleSave}
                disabled={isSaved}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={isSaved ? 'bookmark' : 'bookmark-outline'}
                  size={16}
                  color={isSaved ? primaryColor : theme.textSecondary}
                />
                {/* ✅ Requirement: text changes to "Saved" when saved */}
                <Text style={[styles.saveButtonText, isSaved && styles.saveButtonTextActive]}>
                  {isSaved ? 'Saved' : 'Save Job'}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* RIGHT button: Apply Now / Applied */}
          <TouchableOpacity
            style={[styles.applyButton, isApplied && styles.applyButtonDone]}
            onPress={handleApplyPress}
            disabled={isApplied}
            activeOpacity={0.85}
          >
            <Ionicons
              name={isApplied ? 'checkmark-circle' : 'arrow-forward-circle-outline'}
              size={18}
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