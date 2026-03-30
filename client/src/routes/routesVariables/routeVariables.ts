export const ROUTE_PATHS = {
  ROOT: '/',
  HOME: '/home',
  CONFIGURATOR: '/configurator',
  BROCHURES: '/brochures',
  
  AUTH: '/auth',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  FAVOURITES: '/favourites',
  SETTINGS: '/settings',
  
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_SETTINGS: '/admin/settings',
  
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/401',
  SERVER_ERROR: '/500',
} as const;

export const ROUTE_METADATA = {
  [ROUTE_PATHS.ROOT]: {
    title: 'ORION Configurator',
    description: 'Configure your vehicle',
  },
  [ROUTE_PATHS.CONFIGURATOR]: {
    title: 'Vehicle Configurator',
    description: 'Customize your vehicle',
  },
  [ROUTE_PATHS.BROCHURES]: {
    title: 'Brochures',
    description: 'Download brochures',
  },
  [ROUTE_PATHS.LOGIN]: {
    title: 'Login',
    description: 'Sign in to your account',
  },
  [ROUTE_PATHS.REGISTER]: {
    title: 'Register',
    description: 'Create a new account',
  },
  [ROUTE_PATHS.FAVOURITES]: {
    title: 'My Favourites',
    description: 'Your saved configurations',
  },
} as const;

export const getRouteMetadata = (path: string) => {
  return ROUTE_METADATA[path as keyof typeof ROUTE_METADATA];
};
