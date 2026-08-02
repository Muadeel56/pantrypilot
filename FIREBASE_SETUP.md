# Firebase Setup for PantryPilot

This document outlines the Firebase configuration and setup for PantryPilot.

## Prerequisites

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Enable Firestore Database
4. Register your web app and get the configuration credentials

## Environment Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Firebase project credentials in `.env.local`:
   ```env
   VITE_FIREBASE_API_KEY=your_actual_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_actual_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
   VITE_FIREBASE_APP_ID=your_actual_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_actual_measurement_id
   ```

## Firebase Configuration

### Authentication
- Email/Password authentication is configured
- Users can sign up, sign in, and sign out
- Authentication state is managed via the `useFirebase` composable

### Firestore Database
- Security rules are configured to ensure users can only access their own data
- Collections structure:
  - `users/{userId}` - User profile data
  - `pantries/{userId}/items/{itemId}` - Pantry items
  - `shoppingLists/{userId}/lists/{listId}` - Shopping lists
  - `recipes/{userId}/recipes/{recipeId}` - User recipes

### Security Rules
The Firestore security rules ensure:
- Users can only read/write their own data
- All documents require authentication
- User ID must match the authenticated user's UID

## Development Setup

### Firebase Emulators (Optional)
To use Firebase emulators for local development:

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init
   ```

4. Start emulators:
   ```bash
   firebase emulators:start
   ```

5. Set environment variable to use emulators:
   ```env
   VITE_FIREBASE_USE_EMULATOR=true
   ```

## Usage

### Authentication
```typescript
import { useFirebase } from '@/composables/useFirebase'

const { signIn, signUp, logout, isAuthenticated, user } = useFirebase()

// Sign in
await signIn('user@example.com', 'password')

// Sign up
await signUp('user@example.com', 'password')

// Sign out
await logout()
```

### Firestore Operations
```typescript
import { useFirestore } from '@/composables/useFirestore'

const { addDocument, updateDocument, deleteDocument, getDocuments } = useFirestore()

// Add a document
await addDocument('pantries', { name: 'Milk', quantity: 1 })

// Get documents
const result = await getDocuments('pantries')
```

## Deployment

1. Deploy Firestore rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

2. Deploy Firestore indexes:
   ```bash
   firebase deploy --only firestore:indexes
   ```

## Security Considerations

- Never commit `.env.local` to version control
- Ensure Firestore security rules are properly configured
- Use Firebase App Check for additional security in production
- Regularly review and update security rules as the app evolves
