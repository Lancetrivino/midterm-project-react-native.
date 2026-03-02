import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/colors';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: 8,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.inputBackground,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 14,
      marginBottom: 12,
      borderWidth: 1.5,
      shadowColor: (theme as any).primary,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 2,
    },
    icon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      fontSize: 15,
      color: theme.text,
      fontWeight: '500',
    },
    clearButton: {
      marginLeft: 8,
      padding: 2,
    },
    chipsRow: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 12,
      flexWrap: 'nowrap',
    },
    chip: {
      paddingHorizontal: 14,
      paddingVertical: 7,
      borderRadius: 20,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
    },
    chipActive: {
      backgroundColor: (theme as any).primary,
      borderColor: (theme as any).primary,
    },
    chipText: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.textSecondary,
    },
    chipTextActive: {
      color: '#fff',
    },
    resultCount: {
      fontSize: 13,
      color: theme.textSecondary,
      marginBottom: 8,
      fontWeight: '500',
    },
  });