 import { type ComponentType, type LazyExoticComponent } from 'react';
import { ROUTE_PATHS } from './routeVariables';
import { ConfiguratorPage, BrochuresPage, FavouritesPage, LoginPage, RegisterPage } from '../../pages/index';

export interface RouteConfig {
  path: string;
  name: string;
  title: string;
  component: ComponentType<Record<string, unknown>> | LazyExoticComponent<ComponentType<Record<string, unknown>>>;
  exact?: boolean;
  requiresAuth?: boolean;
  requiresAdmin?: boolean;
  layout?: 'default' | 'fullscreen' | 'auth' | 'admin';
  description?: string;
  preload?: boolean;
}

export const ROUTE_CONFIG: RouteConfig[] = [
  {
    path: ROUTE_PATHS.ROOT,
    name: 'home',
    title: 'ORION Configurator',
    component: ConfiguratorPage,
    exact: true,
    layout: 'fullscreen',
    preload: true,
  },
  {
    path: ROUTE_PATHS.CONFIGURATOR,
    name: 'configurator',
    title: 'Vehicle Configurator',
    component: ConfiguratorPage,
    layout: 'fullscreen',
    preload: true,
  },
  {
    path: ROUTE_PATHS.BROCHURES,
    name: 'brochures',
    title: 'Brochures',
    component: BrochuresPage,
    layout: 'default',
  },
  {
    path: ROUTE_PATHS.LOGIN,
    name: 'login',
    title: 'Login',
    component: LoginPage,
    layout: 'auth',
  },
  {
    path: ROUTE_PATHS.REGISTER,
    name: 'register',
    title: 'Register',
    component: RegisterPage,
    layout: 'auth',
  },
  {
    path: ROUTE_PATHS.FAVOURITES,
    name: 'favourites',
    title: 'My Favourites',
    component: FavouritesPage,
    requiresAuth: true,
    layout: 'default',
  },
];

export const getRouteConfig = (path: string): RouteConfig | undefined => {
  return ROUTE_CONFIG.find(route => route.path === path);
};

export const getBreadcrumbs = (path: string): Array<{ title: string; path: string }> => {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs: Array<{ title: string; path: string }> = [];
  
  let currentPath = '';
  
  segments.forEach(segment => {
    currentPath += `/${segment}`;
    const config = getRouteConfig(currentPath);
    
    if (config) {
      breadcrumbs.push({
        title: config.title || segment,
        path: currentPath,
      });
    }
  });
  
  return breadcrumbs;
};
