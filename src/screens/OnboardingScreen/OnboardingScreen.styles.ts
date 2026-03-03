import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/colors';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 48,
      paddingHorizontal: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    illustration: {
      width: '60%', // responsive width
      maxWidth: 260,
      aspectRatio: 1,
      maxHeight: 300,
      flexShrink: 1,
      marginBottom: 24,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: theme.text,
      textAlign: 'center',
      marginBottom: 16,
    },
    subtitle: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: 'center',
      marginBottom: 32,
      lineHeight: 22,
    },
    button: {
      backgroundColor: (theme as any).primary,
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 24,
      marginTop: 12,
      alignSelf: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '700',
    },
  });