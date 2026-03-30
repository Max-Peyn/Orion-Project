import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../utils/authService';
import type { User } from '../handlers/loginHandlers';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterPageProps {
  onSuccess?: (user: User) => void;
  onNavigate?: (page: 'login' | 'register') => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onSuccess, onNavigate }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };

      const response = await authService.register(userData);
      
      if (response.success && response.user) {
        if (onSuccess) {
          onSuccess(response.user);
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Registration failed. Please try again.';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p className="subtitle">Join us today</p>
        
        {error && (
          <div className="error-message" style={{ display: 'block' }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <small>Min 8 chars, 1 uppercase, 1 lowercase, 1 number</small>
          </div>
          
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        
        <p className="auth-link">
          Already have an account?{' '}
          {onNavigate ? (
            <button 
              type="button" 
              className="link-button" 
              onClick={() => onNavigate('login')}
            >
              Login
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </p>
      </div>
    </div>
  );
};