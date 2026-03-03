import React, { useRef, useState } from 'react';
import { View, TextInput, TouchableOpacity, Animated, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { createStyles } from './SearchBar.styles';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  resultCount?: number;
}

const FILTER_CHIPS = ['All', 'Full-Time', 'Part-Time', 'Contract', 'Internship'];

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search jobs, companies...',
  resultCount,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [focused, setFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const borderAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setFocused(true);
    Animated.timing(borderAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setFocused(false);
    Animated.timing(borderAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.border, (theme as any).primary],
  });

  const shadowOpacity = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.04, 0.12],
  });

  return (
    <View style={styles.wrapper}>
      {/* Search Input */}
      <Animated.View
        style={[
          styles.container,
          {
            borderColor,
            shadowOpacity,
          },
        ]}
      >
        <Ionicons
          name="search-outline"
          size={20}
          color={focused ? (theme as any).primary : theme.textSecondary}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          returnKeyType="search"
        />
        {value.length > 0 ? (
          <TouchableOpacity
            onPress={() => onChangeText('')}
            style={styles.clearButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="close-circle" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        ) : null}
      </Animated.View>

      {/* Filter Chips */}
      <ScrollView
        style={styles.chipsRow}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      >
        {FILTER_CHIPS.map((chip) => {
          const isActive = activeFilter === chip;
          return (
            <TouchableOpacity
              key={chip}
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => {
                setActiveFilter(chip);
                if (chip === 'All') {
                  onChangeText('');
                } else {
                  onChangeText(chip.replace('-', ' '));
                }
              }}
              activeOpacity={0.75}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {chip}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Result count */}
      {resultCount !== undefined && value.length > 0 && (
        <Text style={styles.resultCount}>
          {resultCount} {resultCount === 1 ? 'result' : 'results'} found
        </Text>
      )}
    </View>
  );
};