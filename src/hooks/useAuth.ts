import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { User, CreateUserData } from '@/types';

export interface UseAuthReturn {
  // State
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  
  // Actions
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: CreateUserData & { password: string }) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const {
    user,
    isLoading,
    error,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateUserProfile,
    clearError,
    initializeAuth,
  } = useAuthStore();

  // Initialize Firebase auth listener on mount
  useEffect(() => {
    const unsubscribe = initializeAuth();
    return unsubscribe;
  }, [initializeAuth]);

  const isAuthenticated = !!user;

  return {
    // State
    user,
    isLoading,
    error,
    isAuthenticated,
    
    // Actions
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateProfile: updateUserProfile,
    clearError,
  };
};