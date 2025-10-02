import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { initializeAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from "./getReactNativePersistence";

/**
 * Atenção: NÃO exponha chaves em produção.
 * Use variáveis de ambiente (dotenv, react-native-config) e não faça commit das chaves.
 */
const firebaseConfig = {
  apiKey: "AIzaSyDYVIfDZ_kqRMdHrYRHA1l8pA1edZ-jFN0",
  authDomain: "smartshoppingcart-f59a8.firebaseapp.com",
  projectId: "smartshoppingcart-f59a8",
  storageBucket: "smartshoppingcart-f59a8.firebasestorage.app",
  messagingSenderId: "1062447419900",
  appId: "1:1062447419900:web:8f9a6c077f89ebbf0fa279",
  measurementId: "G-86PM5Z8HJX"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(AsyncStorage),
});


export const firestoreDb = initializeFirestore(firebase, {
  experimentalForceLongPolling: true,
});


export const firebaseStorage = getStorage(firebase);

export default firebase;
