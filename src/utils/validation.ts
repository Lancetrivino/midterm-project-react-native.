import { ValidationResult } from '../types';

export const validateApplicationForm = (
  name: string,
  email: string,
  contactNumber: string,
  whyHireYou: string
): ValidationResult => {
  const errors: ValidationResult['errors'] = {};
  let isValid = true;

  // Name validation
  if (!name.trim()) {
    errors.name = 'Name is required';
    isValid = false;
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
    isValid = false;
  } else if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
    errors.name = 'Name can only contain letters and spaces';
    isValid = false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!emailRegex.test(email.trim())) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }

  // Contact number validation
  const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/;
  if (!contactNumber.trim()) {
    errors.contactNumber = 'Contact number is required';
    isValid = false;
  } else if (!phoneRegex.test(contactNumber.trim().replace(/\s/g, ''))) {
    errors.contactNumber = 'Please enter a valid contact number (10-15 digits)';
    isValid = false;
  }

  // Why hire you validation
  if (!whyHireYou.trim()) {
    errors.whyHireYou = 'This field is required';
    isValid = false;
  } else if (whyHireYou.trim().length < 20) {
    errors.whyHireYou = 'Please provide at least 20 characters';
    isValid = false;
  } else if (whyHireYou.trim().length > 500) {
    errors.whyHireYou = 'Maximum 500 characters allowed';
    isValid = false;
  }

  return { isValid, errors };
};