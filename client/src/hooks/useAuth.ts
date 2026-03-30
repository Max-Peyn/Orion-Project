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
    authManager.initialize();
  }, []);

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

    loginError,
    registerError,

    isLoggingIn,
    isRegistering,
    isLoggingOut
  };
};