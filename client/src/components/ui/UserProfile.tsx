import React, { useState, useRef, useEffect } from 'react';
import type { User } from '../../handlers/loginHandlers';

interface UserProfileProps {
  user: User;
  onLogout: () => void;
  onFavouritesClick?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ 
  user, 
  onLogout, 
  onFavouritesClick 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const getInitials = (name: string): string => {
    const words = name.split(' ');
    let letters = '';
    for (let index = 0; index < words.length; index++) {
      letters = letters + words[index][0];
    }
    return letters.toUpperCase().slice(0, 2);
  };

  const initials = getInitials(user.name || user.email);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDropdownOpen(false);
    onLogout();
  };

  const handleFavourites = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDropdownOpen(false);
    if (onFavouritesClick) {
      onFavouritesClick();
    }
  };

  return (
    <div className="user-profile" ref={profileRef}>
      <div className="user-avatar" onClick={handleAvatarClick}>
        <span className="user-initials">{initials}</span>
      </div>

      <div className={`user-dropdown ${isDropdownOpen ? 'active' : ''}`}>
        <div className="user-dropdown-header">
          <div className="user-avatar-large">
            <span className="user-initials-large">{initials}</span>
          </div>
          <div className="user-info">
            <h3>{user.name || 'User'}</h3>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="user-dropdown-menu">
          <a href="#" className="dropdown-item" onClick={handleFavourites}>
            <span>Favourites</span>
          </a>
          <div className="dropdown-divider"></div>
          <a href="#" className="dropdown-item logout" onClick={handleLogout}>
            <span>Logout</span>
          </a>
        </div>
      </div>
    </div>
  );
};