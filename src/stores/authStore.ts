import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '@/lib/firebase';
import { User, CreateUserData } from '@/types';

interface AuthState {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  isLoading: boolean;
  error: string | null;
  
  // Auth actions
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: CreateUserData & { password: string }) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  
  // State management
  setUser: (user: User | null) => void;
  setFirebaseUser: (user: FirebaseUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  
  // Initialize auth listener
  initializeAuth: () => () => void;
}

const googleProvider = new GoogleAuthProvider();

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      firebaseUser: null,
      isLoading: true,
      error: null,

      signIn: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const firebaseUser = userCredential.user;
          
          // Get user data from Firestore
          const userDoc = await getDoc(doc(firestore, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as User;
            set({ user: userData, firebaseUser });
          } else {
            throw new Error('User profile not found');
          }
        } catch (error: any) {
          set({ error: error.message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      signUp: async (userData) => {
        try {
          set({ isLoading: true, error: null });
          
          const { email, password, ...profileData } = userData;
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const firebaseUser = userCredential.user;
          
          // Update Firebase profile
          await updateProfile(firebaseUser, {
            displayName: profileData.displayName,
          });
          
          // Create user document in Firestore
          const user: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email!,
            displayName: profileData.displayName,
            photoURL: null,
            emailVerified: firebaseUser.emailVerified,
            createdAt: new Date(),
            updatedAt: new Date(),
            username: profileData.username,
            level: 1,
            experience: 0,
            achievements: [],
            preferences: {
              theme: 'dark',
              notifications: {
                email: true,
                push: true,
                sound: true,
              },
              privacy: {
                showOnlineStatus: true,
                allowFriendRequests: true,
                showAchievements: true,
              },
              gaming: {
                preferredGenres: [],
                skillLevel: 'beginner',
                availability: [],
              },
            },
            status: 'online',
            lastActive: new Date(),
          };
          
          await setDoc(doc(firestore, 'users', firebaseUser.uid), user);
          set({ user, firebaseUser });
        } catch (error: any) {
          set({ error: error.message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      signInWithGoogle: async () => {
        try {
          set({ isLoading: true, error: null });
          
          const result = await signInWithPopup(auth, googleProvider);
          const firebaseUser = result.user;
          
          // Check if user exists in Firestore
          const userDoc = await getDoc(doc(firestore, 'users', firebaseUser.uid));
          
          if (!userDoc.exists()) {
            // Create new user profile for Google sign-in
            const user: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              emailVerified: firebaseUser.emailVerified,
              createdAt: new Date(),
              updatedAt: new Date(),
              username: firebaseUser.displayName?.replace(/\s+/g, '').toLowerCase() || `user${firebaseUser.uid.slice(0, 8)}`,
              level: 1,
              experience: 0,
              achievements: [],
              preferences: {
                theme: 'dark',
                notifications: {
                  email: true,
                  push: true,
                  sound: true,
                },
                privacy: {
                  showOnlineStatus: true,
                  allowFriendRequests: true,
                  showAchievements: true,
                },
                gaming: {
                  preferredGenres: [],
                  skillLevel: 'beginner',
                  availability: [],
                },
              },
              status: 'online',
              lastActive: new Date(),
            };
            
            await setDoc(doc(firestore, 'users', firebaseUser.uid), user);
            set({ user, firebaseUser });
          } else {
            const userData = userDoc.data() as User;
            set({ user: userData, firebaseUser });
          }
        } catch (error: any) {
          set({ error: error.message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      signOut: async () => {
        try {
          set({ isLoading: true, error: null });
          await firebaseSignOut(auth);
          set({ user: null, firebaseUser: null });
        } catch (error: any) {
          set({ error: error.message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      resetPassword: async (email: string) => {
        try {
          set({ error: null });
          await sendPasswordResetEmail(auth, email);
        } catch (error: any) {
          set({ error: error.message });
          throw error;
        }
      },

      updateUserProfile: async (data: Partial<User>) => {
        try {
          const { user } = get();
          if (!user) throw new Error('No user logged in');
          
          set({ isLoading: true, error: null });
          
          const updatedUser = {
            ...user,
            ...data,
            updatedAt: new Date(),
          };
          
          await setDoc(doc(firestore, 'users', user.id), updatedUser, { merge: true });
          set({ user: updatedUser });
        } catch (error: any) {
          set({ error: error.message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      setUser: (user) => set({ user }),
      setFirebaseUser: (firebaseUser) => set({ firebaseUser }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      initializeAuth: () => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            try {
              const userDoc = await getDoc(doc(firestore, 'users', firebaseUser.uid));
              if (userDoc.exists()) {
                const userData = userDoc.data() as User;
                set({ user: userData, firebaseUser, isLoading: false });
              } else {
                set({ user: null, firebaseUser: null, isLoading: false });
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
              set({ user: null, firebaseUser: null, isLoading: false });
            }
          } else {
            set({ user: null, firebaseUser: null, isLoading: false });
          }
        });
        
        return unsubscribe;
      },
    }),
    {
      name: 'nightapp-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);