import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/colors';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    cardWrapper: {
      marginBottom: 16,
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: 20,
      overflow: 'hidden',
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 5,
    },
    accentBar: {
      height: 4,
      width: '100%',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: 18,
      paddingBottom: 12,
      gap: 12,
    },
    logoContainer: {
      borderRadius: 12,
      overflow: 'hidden',
    },
    logo: {
      width: 52,
      height: 52,
      borderRadius: 12,
    },
    logoPlaceholder: {
      width: 52,
      height: 52,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoInitial: {
      fontSize: 22,
      fontWeight: '700',
    },
    titleBlock: {
      flex: 1,
      gap: 4,
    },
    title: {
      fontSize: 17,
      fontWeight: '700',
      color: theme.text,
      lineHeight: 22,
    },
    company: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.textSecondary,
    },
    tagsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 18,
      paddingBottom: 14,
      gap: 8,
    },
    tag: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.surface,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 5,
      gap: 5,
      borderWidth: 1,
      borderColor: theme.border,
    },
    tagDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
    },
    tagText: {
      fontSize: 12,
      fontWeight: '600',
    },
    tagTextMuted: {
      fontSize: 12,
      color: theme.textSecondary,
      fontWeight: '500',
    },
    divider: {
      height: 1,
      backgroundColor: theme.border,
      marginHorizontal: 18,
    },
    description: {
      fontSize: 14,
      color: theme.textSecondary,
      lineHeight: 21,
      padding: 18,
      paddingTop: 14,
      paddingBottom: 12,
    },
    buttonRow: {
      paddingHorizontal: 18,
      paddingBottom: 18,
      paddingTop: 4,
      flexDirection: 'row',
      gap: 10,
    },

    // Save button — text label style per requirements
    saveButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 13,
      borderRadius: 14,
      gap: 6,
      borderWidth: 1.5,
      borderColor: theme.border,
      backgroundColor: theme.surface,
    },
    saveButtonActive: {
      backgroundColor: (theme as any).primary + '15',
      borderColor: (theme as any).primary,
    },
    saveButtonText: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.textSecondary,
    },
    saveButtonTextActive: {
      color: (theme as any).primary,
    },

    // Remove button (Saved Jobs screen)
    removeButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 13,
      borderRadius: 14,
      gap: 6,
      borderWidth: 1.5,
      borderColor: (theme as any).danger ?? '#EF4444',
      backgroundColor: ((theme as any).danger ?? '#EF4444') + '10',
    },
    removeButtonText: {
      fontSize: 14,
      fontWeight: '700',
      color: (theme as any).danger ?? '#EF4444',
    },

    applyButton: {
      flex: 1,
      backgroundColor: (theme as any).primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 14,
      borderRadius: 14,
      gap: 8,
    },
    applyButtonDone: {
      backgroundColor: (theme as any).success ?? '#10B981',
      opacity: 0.8,
    },
    applyButtonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '700',
      letterSpacing: 0.2,
    },
  });