import React, { useState } from 'react';
import { UserProfile } from './ui/UserProfile';

interface NavbarProps {
  onAuthClick?: (type: 'login' | 'register') => void;
  onBrochuresClick?: () => void;
  onFavouritesClick?: () => void;
  onLogout?: () => void;
  user?: {
    id: string;
    email: string;
    name?: string;
  } | null;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onAuthClick, 
  onBrochuresClick, 
  onFavouritesClick, 
  onLogout,
  user 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleAuthClick = (type: 'login' | 'register') => {
    if (onAuthClick) onAuthClick(type);
    closeMobileMenu();
  };

  const handleBrochuresClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onBrochuresClick) onBrochuresClick();
    closeMobileMenu();
  };

  const handleFavouritesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onFavouritesClick) onFavouritesClick();
    closeMobileMenu();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="/logo2.png" alt="LOGO" />
        </div>
        
        <div className="navbar-links">
          <a href="#" className="navbar-link" onClick={handleFavouritesClick}>
            FAVOURITES
          </a>
          <a href="#" className="navbar-link" onClick={handleBrochuresClick}>
            BROCHURES
          </a>
        </div>
        
        {!user ? (
          <div className="navbar-auth">
            <button 
              className="auth-btn" 
              onClick={() => handleAuthClick('login')}
            >
              LOGIN
            </button>
            <button 
              className="auth-btn auth-btn-primary" 
              onClick={() => handleAuthClick('register')}
            >
              REGISTER
            </button>
          </div>
        ) : (
          <div className="navbar-user">
            <UserProfile 
              user={user} 
              onLogout={onLogout || (() => {})}
              onFavouritesClick={onFavouritesClick}
            />
          </div>
        )}
        
        <button 
          className={`burger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <a href="#" className="mobile-link" onClick={handleFavouritesClick}>
          FAVOURITES
        </a>
        <a href="#" className="mobile-link" onClick={handleBrochuresClick}>
          BROCHURES
        </a>
        
        {!user && (
          <>
            <button 
              className="mobile-auth-btn" 
              onClick={() => handleAuthClick('login')}
            >
              LOGIN
            </button>
            <button 
              className="mobile-auth-btn mobile-auth-btn-primary" 
              onClick={() => handleAuthClick('register')}
            >
              REGISTER
            </button>
          </>
        )}
      </div>
    </nav>
  );
};