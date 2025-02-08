import { initializeApp, type FirebaseApp, type FirebaseOptions } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import * as React from 'react';
import { useReadFirestore } from './useFirestore/useReadFirestore';
import { useFirestore } from './useFirestore';

const FirebaseContext = React.createContext<{
  readonly getApp: () => FirebaseApp;
  readonly getAuth: () => Auth;
  readonly getFirestore: () => ReturnType<typeof useReadFirestore>;
}>({
  getApp: () => {
    throw new Error('Firebase not initialized or App not enabled');
  },
  getAuth: () => {
    throw new Error('Firebase not initialized or Auth not enabled');
  },
  getFirestore: () => {
    throw new Error('Firebase not initialized or Firestore not enabled');
  },
});

interface FirebaseProviderProps {
  children: React.ReactNode;
  options: FirebaseOptions;
  enableAuth: boolean;
  enableFirestore: boolean;
}

export const FirebaseProvider = ({ children, options, enableAuth, enableFirestore }: FirebaseProviderProps) => {
  if (!options) {
    throw new Error('Firebase options are required');
  }
  const app = initializeApp(options);
  const auth = enableAuth ? getAuth(app) : null;
  const firestore = enableFirestore ? getFirestore(app) : null;

  return (
    <FirebaseContext.Provider
      value={{
        getApp: () => app,
        getAuth: () => {
          if (!auth) {
            throw new Error('Auth not enabled');
          }
          return auth;
        },
        getFirestore: () => {
          if (!firestore) {
            throw new Error('Firestore not enabled');
          }
          return useFirestore(firestore);
        },
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export function useFirebase() {
  const context = React.useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}
