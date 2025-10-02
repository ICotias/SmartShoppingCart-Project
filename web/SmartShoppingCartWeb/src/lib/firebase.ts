// src/lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseEnv = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Validação em dev: evita initializeApp com campos undefined
if (
  !firebaseEnv.apiKey ||
  !firebaseEnv.authDomain ||
  !firebaseEnv.projectId ||
  !firebaseEnv.storageBucket ||
  !firebaseEnv.messagingSenderId ||
  !firebaseEnv.appId
) {
  // Log detalhado para debug
  // Cheque se o dev server foi reiniciado após criar .env.local
  console.error("Firebase env faltando:", firebaseEnv);
  throw new Error(
    "Firebase env inválido. Defina VITE_FIREBASE_* em .env.local e reinicie o dev server."
  );
}

const appConfig = {
  apiKey: firebaseEnv.apiKey,
  authDomain: firebaseEnv.authDomain,
  projectId: firebaseEnv.projectId,
  storageBucket: firebaseEnv.storageBucket,
  messagingSenderId: firebaseEnv.messagingSenderId,
  appId: firebaseEnv.appId,
};

const app = getApps().length ? getApps()[0] : initializeApp(appConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
