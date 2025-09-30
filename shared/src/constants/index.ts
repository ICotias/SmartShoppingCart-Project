export const APP_CONFIG = {
  name: "Smart Shopping Cart",
  version: "1.0.0",
  description: "Intelligent shopping list management",
} as const;

export const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
} as const;

export const STORAGE_KEYS = {
  ITEMS: "@smartshoppingcart:items",
  USER: "@smartshoppingcart:user",
  SETTINGS: "@smartshoppingcart:settings",
} as const;
