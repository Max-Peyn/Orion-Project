import type { LoginCredentials, User, LoginResponse } from '../handlers/loginHandlers';

export type { LoginCredentials };

const API_URL = 'https://threed-configurator-qrxl.onrender.com/api';

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  message?: string;
}

class AuthService {
  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(userData)
      });
      
      const responseText = await response.text();
      
      if (!response.ok) {
        let data: Record<string, unknown>;
        try {
          data = JSON.parse(responseText);
        } catch {
          throw new Error(`Server error: ${response.status}`);
        }
        throw new Error((data.message as string) || `Server error: ${response.status}`);
      }
      
      const data = JSON.parse(responseText);
      return data;
    } catch (error) {
      if (error instanceof Error && (error.message.includes('Failed to fetch') || error.message.includes('502'))) {
        throw new Error('Backend server is not responding. Please try again later.');
      }
      throw error instanceof Error ? error : new Error(String(error));
    }
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      return data;
    } catch (error) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  }

  async logout(): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Logout failed');
      }
      
      return data;
    } catch (error) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  }

  async getCurrentUser(): Promise<{ user: User }> {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get user');
      }
      
      return data;
    } catch (error) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  }
}

export const authService = new AuthService();