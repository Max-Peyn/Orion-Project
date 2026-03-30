import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../utils/authService';
import { useAuthStore } from '../stores/authStore';
import type { LoginCredentials, RegisterData } from '../utils/authService';

export const useAuthQueries = () => {
  const queryClient = useQueryClient();
  const { setUser, clearUser } = useAuthStore();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      if (data.success && data.user) {
        setUser(data.user);
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
    onError: (error) => {
      console.error('Login error:', error);
    }
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (userData: RegisterData) => authService.register(userData),
    onSuccess: (data) => {
      if (data.success && data.user) {
        setUser(data.user);
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
    onError: (error) => {
      console.error('Register error:', error);
    }
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearUser();
      queryClient.clear();
    },
    onError: (error) => {
      console.error('Logout error:', error);
      // Clear user anyway on logout error
      clearUser();
      queryClient.clear();
    }
  });

  // Current user query
  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => authService.getCurrentUser(),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });

  return {
    // Mutations
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    
    // Loading states
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    
    // Error states
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    logoutError: logoutMutation.error,
    
    // User query
    userQuery,
    isLoadingUser: userQuery.isLoading,
    userError: userQuery.error,
  };
};