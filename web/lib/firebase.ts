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
  apiKey: "AIzaSyDYVIfDZ_kqRMdHrYRHA1l8pA1edZ-jFN0",
  authDomain: "smartshoppingcart-f59a8.firebaseapp.com",
  projectId: "smartshoppingcart-f59a8",
  storageBucket: "smartshoppingcart-f59a8.firebasestorage.app",
  messagingSenderId: "1062447419900",
  appId: "1:1062447419900:web:8f9a6c077f89ebbf0fa279",
  measurementId: "G-86PM5Z8HJX"
};

// Reusa a mesma instância no client e evita re-inicialização
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Serviços compartilhados
export const db = getFirestore(app);
export const auth = getAuth(app);
