export interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Gaming specific fields
  username: string;
  level: number;
  experience: number;
  achievements: string[];
  preferences: UserPreferences;
  status: 'online' | 'offline' | 'away' | 'busy';
  lastActive: Date;
}

export interface UserPreferences {
  theme: 'dark' | 'light' | 'auto';
  notifications: {
    email: boolean;
    push: boolean;
    sound: boolean;
  };
  privacy: {
    showOnlineStatus: boolean;
    allowFriendRequests: boolean;
    showAchievements: boolean;
  };
  gaming: {
    preferredGenres: string[];
    skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    availability: string[];
  };
}

export interface CreateUserData {
  email: string;
  displayName: string;
  username: string;
}