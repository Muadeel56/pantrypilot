import { ref, computed } from 'vue'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth'
import { auth } from '@/config/firebase'

export function useFirebase() {
  const user = ref<User | null>(null)
  const loading = ref(true)

  // Computed properties
  const isAuthenticated = computed(() => !!user.value)
  const userEmail = computed(() => user.value?.email || '')
  const userId = computed(() => user.value?.uid || '')

  // Initialize auth state listener
  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser
    loading.value = false
  })

  // Authentication methods
  const signIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return { success: true, user: result.user }
    } catch (error) {
      return { success: false, error: error as Error }
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      return { success: true, user: result.user }
    } catch (error) {
      return { success: false, error: error as Error }
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      return { success: true }
    } catch (error) {
      return { success: false, error: error as Error }
    }
  }

  return {
    // State
    user: computed(() => user.value),
    loading: computed(() => loading.value),
    isAuthenticated,
    userEmail,
    userId,
    
    // Methods
    signIn,
    signUp,
    logout
  }
}
