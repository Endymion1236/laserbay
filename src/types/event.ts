export interface Event {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  createdBy: string; // User ID
  createdAt: Date;
  updatedAt: Date;
  
  // Event details
  eventType: EventType;
  gameMode: string;
  platform: string[];
  maxParticipants: number;
  currentParticipants: number;
  
  // Scheduling
  scheduledFor: Date;
  duration: number; // in minutes
  timezone: string;
  
  // Requirements
  skillLevel: 'any' | 'beginner' | 'intermediate' | 'advanced' | 'expert';
  ageRestriction?: {
    minAge: number;
    maxAge?: number;
  };
  
  // Status
  status: EventStatus;
  isPrivate: boolean;
  requiresApproval: boolean;
  
  // Participants
  participants: EventParticipant[];
  waitlist: EventParticipant[];
  
  // Location (for physical events)
  location?: EventLocation;
  
  // Communication
  chatEnabled: boolean;
  voiceChatEnabled: boolean;
  
  // Rewards
  rewards?: EventReward[];
}

export type EventType = 
  | 'tournament' 
  | 'casual' 
  | 'training' 
  | 'community' 
  | 'ranked' 
  | 'scrimmage';

export type EventStatus = 
  | 'draft' 
  | 'scheduled' 
  | 'open' 
  | 'full' 
  | 'in_progress' 
  | 'completed' 
  | 'cancelled';

export interface EventParticipant {
  userId: string;
  username: string;
  joinedAt: Date;
  role: 'participant' | 'moderator' | 'organizer';
  status: 'confirmed' | 'pending' | 'declined';
  teamAssignment?: string;
}

export interface EventLocation {
  name: string;
  address: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  instructions?: string;
}

export interface EventReward {
  type: 'experience' | 'achievement' | 'item' | 'badge';
  value: number;
  name: string;
  description: string;
  condition: 'participation' | 'win' | 'top3' | 'mvp';
}

export interface CreateEventData {
  title: string;
  description: string;
  eventType: EventType;
  gameMode: string;
  platform: string[];
  maxParticipants: number;
  scheduledFor: Date;
  duration: number;
  skillLevel: 'any' | 'beginner' | 'intermediate' | 'advanced' | 'expert';
  isPrivate: boolean;
  requiresApproval: boolean;
}