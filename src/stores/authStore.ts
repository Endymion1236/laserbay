import { create } from 'zustand'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, firestore } from '@/lib/firebase'
import { User, AuthState } from '@/types'

interface AuthStore extends AuthState {
  // Actions
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, username: string) => Promise<void>
  signOut: () => Promise<void>
  updateUser: (updates: Partial<User>) => Promise<void>
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

const createUserDocument = async (firebaseUser: FirebaseUser, additionalData?: Partial<User>): Promise<User> => {
  const userRef = doc(firestore, 'users', firebaseUser.uid)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) {
    const newUser: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email!,
      displayName: firebaseUser.displayName || '',
      photoURL: firebaseUser.photoURL || '',
      createdAt: new Date(),
      updatedAt: new Date(),
      username: additionalData?.username || firebaseUser.displayName || '',
      level: 1,
      experience: 0,
      gamesPlayed: 0,
      wins: 0,
      losses: 0,
      friends: [],
      friendRequests: [],
      status: 'online',
      bio: '',
      preferences: {
        notifications: true,
        publicProfile: true,
        allowFriendRequests: true,
      },
      ...additionalData,
    }

    await setDoc(userRef, newUser)
    return newUser
  }

  return userSnap.data() as User
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,

  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null })
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = await createUserDocument(userCredential.user)
      
      // Update status to online
      await updateDoc(doc(firestore, 'users', user.id), {
        status: 'online',
        updatedAt: new Date(),
      })

      set({ 
        user: { ...user, status: 'online' }, 
        isAuthenticated: true, 
        loading: false 
      })
    } catch (error: any) {
      set({ 
        error: error.message || 'Failed to sign in', 
        loading: false 
      })
      throw error
    }
  },

  signUp: async (email: string, password: string, username: string) => {
    try {
      set({ loading: true, error: null })
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Update Firebase Auth profile
      await updateProfile(userCredential.user, {
        displayName: username,
      })

      const user = await createUserDocument(userCredential.user, { username })
      
      set({ 
        user, 
        isAuthenticated: true, 
        loading: false 
      })
    } catch (error: any) {
      set({ 
        error: error.message || 'Failed to create account', 
        loading: false 
      })
      throw error
    }
  },

  signOut: async () => {
    try {
      set({ loading: true, error: null })
      
      const currentUser = get().user
      if (currentUser) {
        // Update status to offline before signing out
        await updateDoc(doc(firestore, 'users', currentUser.id), {
          status: 'offline',
          updatedAt: new Date(),
        })
      }

      await firebaseSignOut(auth)
      
      set({ 
        user: null, 
        isAuthenticated: false, 
        loading: false 
      })
    } catch (error: any) {
      set({ 
        error: error.message || 'Failed to sign out', 
        loading: false 
      })
      throw error
    }
  },

  updateUser: async (updates: Partial<User>) => {
    try {
      const currentUser = get().user
      if (!currentUser) throw new Error('No user logged in')

      const updatedUser = {
        ...currentUser,
        ...updates,
        updatedAt: new Date(),
      }

      await updateDoc(doc(firestore, 'users', currentUser.id), updates)
      
      set({ user: updatedUser })
    } catch (error: any) {
      set({ error: error.message || 'Failed to update user' })
      throw error
    }
  },

  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user })
  },

  setLoading: (loading: boolean) => {
    set({ loading })
  },

  setError: (error: string | null) => {
    set({ error })
  },

  clearError: () => {
    set({ error: null })
  },
}))