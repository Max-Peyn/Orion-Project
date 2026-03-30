import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../utils/authService';
import { useAuthStore } from '../stores/authStore';
import type { LoginCredentials } from '../handlers/loginHandlers';
import type { RegisterData } from '../utils/authService';

export const useAuthQueries = () => {
  const queryClient = useQueryClient();
  const { setUser, clearUser } = useAuthStore();

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

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearUser();
      queryClient.clear();
    },
    onError: (error) => {
      console.error('Logout error:', error);
      clearUser();
      queryClient.clear();
    }
  });

  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => authService.getCurrentUser(),
    retry: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,

    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,

    loginError: loginMutation.error,
    registerError: registerMutation.error,
    logoutError: logoutMutation.error,

    userQuery,
    isLoadingUser: userQuery.isLoading,
    userError: userQuery.error,
  };
};