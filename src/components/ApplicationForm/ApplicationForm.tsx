import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useJobs } from '../../context/JobContext';
import { Job } from '../../types';
import { validateApplicationForm } from '../../utils/validation';
import { createStyles } from './ApplicationForm.styles';

interface ApplicationFormProps {
  visible: boolean;
  job: Job | null;
  onClose: () => void;
  fromSavedJobs?: boolean;
  onSuccessFromSaved?: () => void;
}

interface FieldProps {
  label: string;
  required?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  placeholder: string;
  keyboardType?: any;
  autoCapitalize?: any;
  multiline?: boolean;
  maxLength?: number;
  styles: any;
  theme: any;
}

const FormField: React.FC<FieldProps> = ({
  label,
  required,
  value,
  onChangeText,
  error,
  placeholder,
  keyboardType,
  autoCapitalize,
  multiline,
  maxLength,
  styles,
  theme,
}) => {
  const [focused, setFocused] = useState(false);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  React.useEffect(() => {
    if (error) shake();
  }, [error]);

  return (
    <Animated.View
      style={[styles.inputContainer, { transform: [{ translateX: shakeAnim }] }]}
    >
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <View
        style={[
          styles.inputWrapper,
          focused && styles.inputWrapperFocused,
          error && styles.inputWrapperError,
        ]}
      >
        <TextInput
          style={[styles.input, multiline && styles.textArea]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.placeholder}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          numberOfLines={multiline ? 6 : 1}
          maxLength={maxLength}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
      <View style={styles.inputFooter}>
        {error ? (
          <View style={styles.errorRow}>
            <Ionicons name="alert-circle" size={13} color={theme.danger ?? '#EF4444'} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <View />
        )}
        {maxLength && (
          <Text style={[styles.charCount, value.length >= maxLength && styles.charCountMax]}>
            {value.length}/{maxLength}
          </Text>
        )}
      </View>
    </Animated.View>
  );
};

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  visible,
  job,
  onClose,
  fromSavedJobs = false,
  onSuccessFromSaved,
}) => {
  const { theme } = useTheme();
  const { submitApplication } = useJobs();
  const styles = createStyles(theme);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [whyHireYou, setWhyHireYou] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const successScaleAnim = useRef(new Animated.Value(0.5)).current;
  const successOpacityAnim = useRef(new Animated.Value(0)).current;

  const resetForm = () => {
    setName('');
    setEmail('');
    setContactNumber('');
    setWhyHireYou('');
    setErrors({});
    setIsSubmitting(false);
  };

  const handleSubmit = async () => {
    if (!job || isSubmitting) return;

    const validation = validateApplicationForm(name, email, contactNumber, whyHireYou);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    // Simulate slight async delay for UX
    await new Promise((res) => setTimeout(res, 400));

    submitApplication({
      jobId: job.id,
      name: name.trim(),
      email: email.trim(),
      contactNumber: contactNumber.trim(),
      whyHireYou: whyHireYou.trim(),
    });

    resetForm();
    setShowSuccess(true);

    // Animate success modal in
    Animated.parallel([
      Animated.spring(successScaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 12,
      }),
      Animated.timing(successOpacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSuccessClose = () => {
    successScaleAnim.setValue(0.5);
    successOpacityAnim.setValue(0);
    setShowSuccess(false);
    handleClose();
    if (fromSavedJobs && onSuccessFromSaved) {
      onSuccessFromSaved();
    }
  };

  if (!job) return null;

  return (
    <>
      <Modal visible={visible} animationType="slide" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.overlay}
        >
          <View style={styles.container}>
            {/* Handle bar */}
            <View style={styles.handleBar} />

            <View style={styles.header}>
              <View>
                <Text style={styles.title}>Apply for Job</Text>
                <Text style={styles.subtitle}>Fill in your details below</Text>
              </View>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Ionicons name="close" size={22} color={theme.text} />
              </TouchableOpacity>
            </View>

            {/* Job info pill */}
            <View style={styles.jobInfo}>
              <View style={styles.jobInfoDot} />
              <View>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.jobCompany}>{job.company}</Text>
              </View>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <FormField
                label="Full Name"
                required
                value={name}
                onChangeText={(t) => { setName(t); setErrors({ ...errors, name: undefined }); }}
                error={errors.name}
                placeholder="John Doe"
                styles={styles}
                theme={theme}
              />

              <FormField
                label="Email Address"
                required
                value={email}
                onChangeText={(t) => { setEmail(t); setErrors({ ...errors, email: undefined }); }}
                error={errors.email}
                placeholder="john@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                styles={styles}
                theme={theme}
              />

              <FormField
                label="Contact Number"
                required
                value={contactNumber}
                onChangeText={(t) => { setContactNumber(t); setErrors({ ...errors, contactNumber: undefined }); }}
                error={errors.contactNumber}
                placeholder="+1 (555) 123-4567"
                keyboardType="phone-pad"
                styles={styles}
                theme={theme}
              />

              <FormField
                label="Why should we hire you?"
                required
                value={whyHireYou}
                onChangeText={(t) => {
                  if (t.length <= 500) {
                    setWhyHireYou(t);
                    setErrors({ ...errors, whyHireYou: undefined });
                  }
                }}
                error={errors.whyHireYou}
                placeholder="Tell us why you're the perfect fit..."
                multiline
                maxLength={500}
                styles={styles}
                theme={theme}
              />

              <TouchableOpacity
                style={[styles.submitButton, isSubmitting && styles.submitButtonLoading]}
                onPress={handleSubmit}
                activeOpacity={0.85}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Text style={styles.submitButtonText}>Submitting...</Text>
                ) : (
                  <>
                    <Ionicons name="paper-plane-outline" size={18} color="#fff" />
                    <Text style={styles.submitButtonText}>Submit Application</Text>
                  </>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Success Modal */}
      <Modal visible={showSuccess} animationType="fade" transparent>
        <View style={styles.successOverlay}>
          <Animated.View
            style={[
              styles.successContainer,
              {
                opacity: successOpacityAnim,
                transform: [{ scale: successScaleAnim }],
              },
            ]}
          >
            <View style={styles.successIconRing}>
              <Ionicons name="checkmark" size={44} color="#fff" />
            </View>
            <Text style={styles.successTitle}>Application Sent!</Text>
            <Text style={styles.successMessage}>
              Your application for{' '}
              <Text style={styles.successBold}>{job.title}</Text> at{' '}
              <Text style={styles.successBold}>{job.company}</Text> has been submitted.
              Good luck! 🎉
            </Text>
            <TouchableOpacity style={styles.okButton} onPress={handleSuccessClose} activeOpacity={0.85}>
              <Text style={styles.okButtonText}>Back to Jobs</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};