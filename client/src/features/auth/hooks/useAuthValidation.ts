import { useState, useCallback } from 'react';

export interface ValidationErrors {
  email?: string;
  password?: string;
  name?: string;
  confirmPassword?: string;
}

export const useAuthValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      return false;
    }
    setErrors(prev => ({ ...prev, email: undefined }));
    return true;
  }, []);

  const validatePassword = useCallback((password: string): boolean => {
    if (!password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
      return false;
    }
    if (password.length < 8) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters long' }));
      return false;
    }
    setErrors(prev => ({ ...prev, password: undefined }));
    return true;
  }, []);

  const validateName = useCallback((name: string): boolean => {
    if (!name) {
      setErrors(prev => ({ ...prev, name: 'Name is required' }));
      return false;
    }
    if (name.length < 2) {
      setErrors(prev => ({ ...prev, name: 'Name must be at least 2 characters long' }));
      return false;
    }
    setErrors(prev => ({ ...prev, name: undefined }));
    return true;
  }, []);

  const validateConfirmPassword = useCallback((password: string, confirmPassword: string): boolean => {
    if (!confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Please confirm your password' }));
      return false;
    }
    if (password !== confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      return false;
    }
    setErrors(prev => ({ ...prev, confirmPassword: undefined }));
    return true;
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearError = useCallback((field: keyof ValidationErrors) => {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  }, []);

  return {
    errors,
    validateEmail,
    validatePassword,
    validateName,
    validateConfirmPassword,
    clearErrors,
    clearError,
  };
};