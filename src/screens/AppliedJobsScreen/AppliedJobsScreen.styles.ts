import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/colors';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingTop: 60,
      paddingBottom: 20,
      backgroundColor: theme.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    headerEyebrow: {
      fontSize: 13,
      color: theme.textSecondary,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 2,
    },
    headerTitle: {
      fontSize: 30,
      fontWeight: '800',
      color: theme.text,
      letterSpacing: -0.5,
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    countBadge: {
      backgroundColor: (theme as any).success ?? '#10B981',
      minWidth: 28,
      height: 28,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
    },
    countBadgeText: {
      color: '#fff',
      fontSize: 13,
      fontWeight: '700',
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    listContent: {
      paddingBottom: 32,
    },

    // Application Card
    card: {
      backgroundColor: theme.card,
      borderRadius: 20,
      marginBottom: 16,
      overflow: 'hidden',
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    },
    accentBar: {
      height: 4,
      backgroundColor: (theme as any).success ?? '#10B981',
    },
    cardBody: {
      padding: 18,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
      marginBottom: 14,
    },
    logoPlaceholder: {
      width: 48,
      height: 48,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoInitial: {
      fontSize: 20,
      fontWeight: '700',
    },
    logo: {
      width: 48,
      height: 48,
      borderRadius: 12,
    },
    titleBlock: {
      flex: 1,
    },
    jobTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.text,
      marginBottom: 2,
    },
    company: {
      fontSize: 13,
      color: theme.textSecondary,
      fontWeight: '500',
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: ((theme as any).success ?? '#10B981') + '18',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
      alignSelf: 'flex-start',
    },
    statusDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: (theme as any).success ?? '#10B981',
    },
    statusText: {
      fontSize: 12,
      fontWeight: '700',
      color: (theme as any).success ?? '#10B981',
    },
    divider: {
      height: 1,
      backgroundColor: theme.border,
      marginBottom: 14,
    },
    metaRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    metaText: {
      fontSize: 12,
      color: theme.textSecondary,
      fontWeight: '500',
    },
    detailsSection: {
      marginTop: 14,
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 14,
      gap: 8,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    detailLabel: {
      fontSize: 12,
      fontWeight: '700',
      color: theme.textSecondary,
      width: 70,
    },
    detailValue: {
      fontSize: 13,
      color: theme.text,
      fontWeight: '500',
      flex: 1,
    },

    // Stats bar
    statsBar: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
      marginBottom: 16,
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.border,
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 20,
      fontWeight: '800',
      color: theme.text,
      letterSpacing: -0.5,
    },
    statLabel: {
      fontSize: 11,
      color: theme.textSecondary,
      fontWeight: '600',
      marginTop: 2,
    },
    statDivider: {
      width: 1,
      height: 28,
      backgroundColor: theme.border,
    },

    // Empty state
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
      gap: 12,
    },
    emptyIconContainer: {
      width: 88,
      height: 88,
      borderRadius: 44,
      backgroundColor: theme.surface,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
      borderWidth: 1,
      borderColor: theme.border,
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.text,
      textAlign: 'center',
    },
    emptyMessage: {
      fontSize: 14,
      color: theme.textSecondary,
      textAlign: 'center',
      lineHeight: 21,
      maxWidth: 280,
    },
    cancelButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: ((theme as any).danger ?? '#EF4444') + '12',
      borderWidth: 1,
      borderColor: ((theme as any).danger ?? '#EF4444') + '30',
    },
    cancelButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: (theme as any).danger ?? '#EF4444',
    },
  });