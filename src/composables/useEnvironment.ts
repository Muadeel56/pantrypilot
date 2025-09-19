import { computed } from 'vue';

/**
 * Composable for accessing environment variables
 * Provides type-safe access to Vite environment variables
 */
export function useEnvironment() {
  const firebaseConfig = computed(() => ({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  }));

  const appConfig = computed(() => ({
    name: import.meta.env.VITE_APP_NAME || 'PantryPilot',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    environment: import.meta.env.VITE_APP_ENV || 'development',
  }));

  const apiConfig = computed(() => ({
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  }));

  const featureFlags = computed(() => ({
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    debugMode: import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true',
  }));

  const isDevelopment = computed(() => import.meta.env.DEV);
  const isProduction = computed(() => import.meta.env.PROD);

  return {
    firebaseConfig,
    appConfig,
    apiConfig,
    featureFlags,
    isDevelopment,
    isProduction,
  };
}
