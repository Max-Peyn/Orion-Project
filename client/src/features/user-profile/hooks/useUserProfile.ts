import { useState, useCallback } from 'react';
import type { User } from '../../../handlers/loginHandlers';

export interface UserProfileData extends User {
  avatar?: string;
  bio?: string;
  preferences?: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    notifications: boolean;
  };
}

export const useUserProfile = (initialUser?: User) => {
  const [profile, setProfile] = useState<UserProfileData | null>(
    initialUser ? {
      ...initialUser,
      preferences: {
        theme: 'auto',
        language: 'en',
        notifications: true,
      },
    } : null
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const updateProfile = useCallback(async (updates: Partial<UserProfileData>) => {
    if (!profile) return;

    setIsUpdating(true);
    try {
      const updatedProfile = { ...profile, ...updates };
      setProfile(updatedProfile);

      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));

      return updatedProfile;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  }, [profile]);

  const updateAvatar = useCallback(async (avatarUrl: string) => {
    return updateProfile({ avatar: avatarUrl });
  }, [updateProfile]);

  const updatePreferences = useCallback(async (preferences: Partial<UserProfileData['preferences']>) => {
    if (!profile?.preferences) return;
    
    return updateProfile({
      preferences: {
        ...profile.preferences,
        ...preferences,
      },
    });
  }, [profile?.preferences, updateProfile]);

  const resetProfile = useCallback(() => {
    setProfile(null);
    localStorage.removeItem('userProfile');
  }, []);

  return {
    profile,
    isUpdating,
    updateProfile,
    updateAvatar,
    updatePreferences,
    resetProfile,
  };
};