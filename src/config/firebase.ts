import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)

// Initialize Analytics (only in production and if measurement ID is provided)
export const analytics = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID 
  ? getAnalytics(app) 
  : null

// Connect to emulators in development
if (import.meta.env.VITE_FIREBASE_USE_EMULATOR === 'true') {
  const emulatorHost = import.meta.env.VITE_FIREBASE_EMULATOR_HOST || 'localhost'
  const emulatorPort = import.meta.env.VITE_FIREBASE_EMULATOR_PORT || '9099'
  
  // Connect Auth emulator
  connectAuthEmulator(auth, `http://${emulatorHost}:9099`)
  
  // Connect Firestore emulator
  connectFirestoreEmulator(db, emulatorHost, 8080)
}

export default app
