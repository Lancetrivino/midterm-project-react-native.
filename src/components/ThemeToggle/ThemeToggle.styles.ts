import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/colors';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: 42,
      height: 42,
      borderRadius: 12,
      backgroundColor: theme.surface,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 2,
    },
  });