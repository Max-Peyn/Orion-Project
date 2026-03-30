import React, { createContext, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ROUTE_PATHS, 
  getRouteMetadata,
  getRouteConfig, 
  getBreadcrumbs 
} from './routesVariables';
import type { RouteConfig } from './routesVariables';

interface RouteContextType {
  currentPath: string;
  currentRoute: RouteConfig | undefined;
  breadcrumbs: Array<{ title: string; path: string }>;
  canAccess: () => boolean;
  navigateTo: (path: string, options?: { replace?: boolean; state?: Record<string, unknown> }) => void;
  goBack: () => void;
  isCurrentRoute: (path: string) => boolean;
  getPageTitle: () => string;
  getPageDescription: () => string;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

interface RouteProviderProps {
  children: React.ReactNode;
}

export const RouteProvider: React.FC<RouteProviderProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentPath = location.pathname;
  const currentRoute = getRouteConfig(currentPath);
  const breadcrumbs = getBreadcrumbs(currentPath);

  const navigateTo = (path: string, options?: { replace?: boolean; state?: Record<string, unknown> }) => {
    navigate(path, options);
  };

  const goBack = () => {
    navigate(-1);
  };

  const isCurrentRoute = (path: string): boolean => {
    return currentPath === path;
  };

  const canAccess = (): boolean => {
    return true;
  };

  const getPageTitle = (): string => {
    const metadata = getRouteMetadata(currentPath);
    const config = currentRoute;
    
    return config?.title || metadata?.title || 'ORION';
  };

  const getPageDescription = (): string => {
    const metadata = getRouteMetadata(currentPath);
    const config = currentRoute;
    
    return config?.description || metadata?.description || '';
  };

  useEffect(() => {
    document.title = getPageTitle();
  }, [currentPath]);

  const contextValue: RouteContextType = {
    currentPath,
    currentRoute,
    breadcrumbs,
    canAccess,
    navigateTo,
    goBack,
    isCurrentRoute,
    getPageTitle,
    getPageDescription,
  };

  return (
    <RouteContext.Provider value={contextValue}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = (): RouteContextType => {
  const context = useContext(RouteContext);

  if (!context) {
    throw new Error('useRoute must be used within a RouteProvider');
  }

  return context;
};

export const useNavigation = () => {
  const { navigateTo } = useRoute();

  return {
    navigateTo,
    goHome: () => navigateTo(ROUTE_PATHS.ROOT),
    goConfigurator: () => navigateTo(ROUTE_PATHS.CONFIGURATOR),
    goBrochures: () => navigateTo(ROUTE_PATHS.BROCHURES),
    goFavourites: () => navigateTo(ROUTE_PATHS.FAVOURITES),
    goLogin: () => navigateTo(ROUTE_PATHS.LOGIN),
    goRegister: () => navigateTo(ROUTE_PATHS.REGISTER),
  };
};
