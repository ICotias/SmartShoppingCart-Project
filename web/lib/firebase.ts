// lib/firebase.ts
// Inicializa Firebase com proteção SSR e evita múltiplas inicializações (HMR).
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Analytics só no browser: import dinâmico e com verificação de suporte.
export async function getAnalyticsBrowserSafe(app: import("firebase/app").FirebaseApp) {
  if (typeof window === "undefined") return null;
  const { getAnalytics, isSupported } = await import("firebase/analytics");
  const supported = await isSupported();
  return supported ? getAnalytics(app) : null;
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Reusa a mesma instância no client e evita re-inicialização
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Serviços compartilhados
export const db = getFirestore(app);
export const auth = getAuth(app);
