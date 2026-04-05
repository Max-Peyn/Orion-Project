import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Navbar } from './Navigation';
import { useAuth } from '../hooks';

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleAuthClick = (type: 'login' | 'register') => {
    navigate(`/${type}`);
  };

  const handleBrochuresClick = () => {
    navigate('/brochures');
  };

  const handleFavouritesClick = () => {
    navigate('/favourites');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="app-layout">
      <Navbar 
        user={user} 
        onAuthClick={handleAuthClick}
        onBrochuresClick={handleBrochuresClick}
        onFavouritesClick={handleFavouritesClick}
        onLogout={handleLogout}
      />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};