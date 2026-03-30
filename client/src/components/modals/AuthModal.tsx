import React, { useState, useEffect } from 'react';
import { LoginPage } from '../../pages/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage';
import type { User } from '../../handlers/loginHandlers';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPage?: 'login' | 'register';
  onAuthSuccess?: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialPage = 'login',
  onAuthSuccess
}) => {
  const [currentPage, setCurrentPage] = useState<'login' | 'register'>(initialPage);

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleAuthSuccess = (user: User) => {
    onClose();
    if (onAuthSuccess) {
      onAuthSuccess(user);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`auth-modal ${isOpen ? 'active' : ''}`}>
      <div className="auth-modal-overlay" onClick={handleOverlayClick} />
      <div className="auth-modal-content">
        <button className="auth-modal-close" onClick={onClose}>
          &times;
        </button>
        <div id="authModalBody">
          {currentPage === 'login' ? (
            <LoginPage
              onSuccess={handleAuthSuccess}
              onNavigate={setCurrentPage}
            />
          ) : (
            <RegisterPage
              onSuccess={handleAuthSuccess}
              onNavigate={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};