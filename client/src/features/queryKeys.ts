export const queryKeys = {
  auth: {
    user: ['auth', 'user'] as const,
    session: ['auth', 'session'] as const,
  },
  
  vehicleConfiguration: {
    all: ['vehicle-configuration'] as const,
    current: ['vehicle-configuration', 'current'] as const,
    colors: ['vehicle-configuration', 'colors'] as const,
    wheels: ['vehicle-configuration', 'wheels'] as const,
    accessories: ['vehicle-configuration', 'accessories'] as const,
  },
  
  favourites: {
    all: ['favourites'] as const,
    byUser: (userId: string) => ['favourites', 'user', userId] as const,
    byId: (id: string) => ['favourites', id] as const,
  },
  
  userProfile: {
    all: ['user-profile'] as const,
    byId: (userId: string) => ['user-profile', userId] as const,
    settings: (userId: string) => ['user-profile', userId, 'settings'] as const,
  },
  
  models: {
    all: ['models'] as const,
    sprinter: ['models', 'sprinter'] as const,
    pickup: ['models', 'pickup'] as const,
    wheels: ['models', 'wheels'] as const,
    accessories: ['models', 'accessories'] as const,
  },
} as const;

export const mutationKeys = {
  auth: {
    login: 'auth-login',
    logout: 'auth-logout',
    register: 'auth-register',
    refreshToken: 'auth-refresh-token',
  },
  
  vehicleConfiguration: {
    update: 'vehicle-configuration-update',
    reset: 'vehicle-configuration-reset',
    save: 'vehicle-configuration-save',
  },
  
  favourites: {
    create: 'favourites-create',
    update: 'favourites-update',
    delete: 'favourites-delete',
  },
  
  userProfile: {
    update: 'user-profile-update',
    updateSettings: 'user-profile-update-settings',
    uploadAvatar: 'user-profile-upload-avatar',
  },
} as const;