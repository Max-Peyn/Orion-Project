import { useState, useCallback, useEffect } from 'react';

export interface UserSettings {
  theme: 'light' | 'dark' | 'auto';
  language: 'en' | 'uk' | 'de' | 'fr';
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  privacy: {
    shareData: boolean;
    analytics: boolean;
  };
  display: {
    animations: boolean;
    highContrast: boolean;
    fontSize: 'small' | 'medium' | 'large';
  };
}

const DEFAULT_SETTINGS: UserSettings = {
  theme: 'auto',
  language: 'en',
  notifications: {
    email: true,
    push: true,
    marketing: false,
  },
  privacy: {
    shareData: false,
    analytics: true,
  },
  display: {
    animations: true,
    highContrast: false,
    fontSize: 'medium',
  },
};

const SETTINGS_STORAGE_KEY = 'orion_user_settings';

export const useUserSettings = () => {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings({ ...DEFAULT_SETTINGS, ...parsedSettings });
      }
    } catch (error) {
      console.error('Error loading user settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    }
  }, [settings, isLoading]);

  const updateSettings = useCallback((updates: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  const updateTheme = useCallback((theme: UserSettings['theme']) => {
    updateSettings({ theme });
  }, [updateSettings]);

  const updateLanguage = useCallback((language: UserSettings['language']) => {
    updateSettings({ language });
  }, [updateSettings]);

  const updateNotifications = useCallback((notifications: Partial<UserSettings['notifications']>) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, ...notifications },
    }));
  }, []);

  const updatePrivacy = useCallback((privacy: Partial<UserSettings['privacy']>) => {
    setSettings(prev => ({
      ...prev,
      privacy: { ...prev.privacy, ...privacy },
    }));
  }, []);

  const updateDisplay = useCallback((display: Partial<UserSettings['display']>) => {
    setSettings(prev => ({
      ...prev,
      display: { ...prev.display, ...display },
    }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return {
    settings,
    isLoading,
    updateSettings,
    updateTheme,
    updateLanguage,
    updateNotifications,
    updatePrivacy,
    updateDisplay,
    resetSettings,
  };
};