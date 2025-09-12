import { useEffect } from 'react'
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, firestore } from '@/lib/firebase'
import { useAuthStore } from '@/stores/authStore'
import { User } from '@/types'

export const useAuth = () => {
  const {
    user,
    loading,
    error,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
    updateUser,
    setUser,
    setLoading,
    setError,
    clearError,
  } = useAuthStore()

  useEffect(() => {
    setLoading(true)
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      try {
        if (firebaseUser) {
          // Get user data from Firestore
          const userRef = doc(firestore, 'users', firebaseUser.uid)
          const userSnap = await getDoc(userRef)
          
          if (userSnap.exists()) {
            const userData = userSnap.data() as User
            setUser(userData)
          } else {
            // If user document doesn't exist, create it
            const newUser: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              displayName: firebaseUser.displayName || '',
              photoURL: firebaseUser.photoURL || '',
              createdAt: new Date(),
              updatedAt: new Date(),
              username: firebaseUser.displayName || '',
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
            }
            setUser(newUser)
          }
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        setError('Failed to load user data')
        setUser(null)
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [setUser, setLoading, setError])

  return {
    user,
    loading,
    error,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
    updateUser,
    clearError,
  }
}