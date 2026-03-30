import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useAuthQueries } from './useAuthQueries';
import { authManager } from '../managers/AuthManager';
import type { LoginCredentials } from '../handlers/loginHandlers';
import type { RegisterData } from '../utils/authService';

export const useAuth = () => {
  const {
    currentUser,
    isAuthenticated,
    isLoading,
    setUser,
    checkAuth
  } = useAuthStore();

  const {
    login: loginMutation,
    register: registerMutation,
    logout: logoutMutation,
    isLoggingIn,
    isRegistering,
    isLoggingOut,
    loginError,
    registerError,
    userQuery
  } = useAuthQueries();

  useEffect(() => {
    // Initialize auth manager on mount
    authManager.initialize();
  }, []);

  // Update store when user query succeeds
  useEffect(() => {
    if (userQuery.data?.user) {
      setUser(userQuery.data.user);
    }
  }, [userQuery.data, setUser]);

  const handleLogin = async (credentials: LoginCredentials) => {
    loginMutation(credentials);
  };

  const handleRegister = async (userData: RegisterData) => {
    registerMutation(userData);
  };

  const handleLogout = async () => {
    await authManager.logout();
    logoutMutation();
  };

  return {
    user: currentUser,
    isAuthenticated,
    isLoading: isLoading || isLoggingIn || isRegistering || isLoggingOut || userQuery.isLoading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    checkAuth,
    
    // Error states
    loginError,
    registerError,
    
    // Loading states
    isLoggingIn,
    isRegistering,
    isLoggingOut
  };
};