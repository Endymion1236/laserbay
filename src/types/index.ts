export interface User {
  id: string
  email: string
  displayName?: string
  photoURL?: string
  createdAt: Date
  updatedAt: Date
  // Gaming profile
  username: string
  level: number
  experience: number
  gamesPlayed: number
  wins: number
  losses: number
  // Social features
  friends: string[]
  friendRequests: string[]
  status: 'online' | 'offline' | 'in-game' | 'away'
  bio?: string
  // Preferences
  preferences: {
    notifications: boolean
    publicProfile: boolean
    allowFriendRequests: boolean
  }
}

export interface Event {
  id: string
  title: string
  description: string
  type: 'tournament' | 'casual' | 'training' | 'special'
  gameMode: string
  createdBy: string
  createdAt: Date
  startTime: Date
  endTime?: Date
  maxParticipants: number
  currentParticipants: string[]
  status: 'upcoming' | 'active' | 'completed' | 'cancelled'
  location?: {
    type: 'online' | 'physical'
    address?: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  prizes?: {
    first?: string
    second?: string
    third?: string
  }
  requirements?: {
    minLevel?: number
    maxLevel?: number
    inviteOnly?: boolean
  }
  metadata: {
    views: number
    likes: number
    shares: number
  }
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
}