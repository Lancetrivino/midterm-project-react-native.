import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { createStyles } from './ThemeToggle.styles';

export const ThemeToggle: React.FC = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const styles = createStyles(theme);

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue: isDark ? 1 : 0,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.7,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          speed: 30,
          bounciness: 10,
        }),
      ]),
    ]).start();
  }, [isDark]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <TouchableOpacity style={styles.container} onPress={toggleTheme} activeOpacity={0.8}>
      <Animated.View style={{ transform: [{ rotate }, { scale: scaleAnim }] }}>
        <Ionicons
          name={isDark ? 'sunny' : 'moon'}
          size={22}
          color={isDark ? '#FBBF24' : '#6366F1'}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};