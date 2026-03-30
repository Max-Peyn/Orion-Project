import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import type { LoginCredentials, User } from '../handlers/loginHandlers';
import { authService } from '../utils/authService';

interface LoginPageProps {
  onSuccess?: (user: User) => void;
  onNavigate?: (page: 'login' | 'register') => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSuccess, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    remember: false
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.login(credentials);
      
      if (response.success && response.user) {
        if (onSuccess) {
          onSuccess(response.user);
        } else {
          navigate(from, { replace: true });
        }
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Login failed. Please try again.';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p className="subtitle">Login to your account</p>
        
        {error && (
          <div className="error-message" style={{ display: 'block' }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-options">
            <label className="checkbox">
              <input
                type="checkbox"
                name="remember"
                checked={credentials.remember}
                onChange={handleInputChange}
              />
              <span>Remember me</span>
            </label>
          </div>
          
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <p className="auth-link">
          Don't have an account?{' '}
          {onNavigate ? (
            <button 
              type="button" 
              className="link-button" 
              onClick={() => onNavigate('register')}
            >
              Register
            </button>
          ) : (
            <Link to="/register">Register</Link>
          )}
        </p>
      </div>
    </div>
  );
};