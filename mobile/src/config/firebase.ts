// src/services/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from '@/config/getReactNativePersistence'; // garante que exporta a função correta
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Atenção: NÃO exponha chaves em produção.
 * Use variáveis de ambiente (dotenv, react-native-config) e não faça commit das chaves.
 */
const firebaseConfig = {
  apiKey: 'AIzaSyBacIB4D3AHMjaiRwUqMnQpMq3OuN-nUrg',
  authDomain: 'smartshoppingcart-f59a8.firebaseapp.com',
  projectId: 'smartshoppingcart-f59a8',
  storageBucket: 'smartshoppingcart-f59a8.firebasestorage.app',
  messagingSenderId: '1062447419900',
  appId: '1:1062447419900:ios:1d9d47e0c1a4b55e0fa279',
};

// Idempotente: reutiliza app se já existir, senão inicializa
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

/**
 * Auth para React Native:
 * - initializeAuth é obrigatório no RN (Hermes)
 * - Persistência com AsyncStorage garante sessão entre reinícios
 * - Chame apenas UMA vez durante todo o ciclo
 */
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

/**
 * Firestore (SDK Web) funciona bem em RN
 */
export const db = getFirestore(app);

// Emulador (opcional)
// import { connectFirestoreEmulator } from 'firebase/firestore';
// if (__DEV__) {
//   connectFirestoreEmulator(db, 'localhost', 8080);
// }

export default app;
