import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [vue(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: parseInt(env.VITE_DEV_SERVER_PORT) || 5001,
      host: env.VITE_DEV_SERVER_HOST || true,
      strictPort: true,
    },
    // Define global constants for build-time replacement
    define: {
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION || '1.0.0'),
      __APP_NAME__: JSON.stringify(env.VITE_APP_NAME || 'PantryPilot'),
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV || 'development'),
    },
    // Environment variables are automatically available via import.meta.env
    // No additional configuration needed for VITE_ prefixed variables
  };
});
