// src/storage/authStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const USERS_KEY = "@smartshoppingcart:users";
const SESSION_KEY = "@smartshoppingcart:session";

type UserRecord = { email: string; password: string };

export async function registerUser(email: string, password: string): Promise<void> {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  const users: UserRecord[] = raw ? JSON.parse(raw) : [];

  const normalizedEmail = email.trim().toLowerCase();
  if (users.some(u => u.email === normalizedEmail)) {
    throw new Error("Erro ao registrar.");
  }

  const updated = [...users, { email: normalizedEmail, password }];
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updated));
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify({ email: normalizedEmail }));
}

export async function loginUser(email: string, password: string): Promise<void> {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  const users: UserRecord[] = raw ? JSON.parse(raw) : [];
  const normalizedEmail = email.trim().toLowerCase();

  const ok = users.some(u => u.email === normalizedEmail && u.password === password);
  if (!ok) {
    throw new Error("Falha ao entrar.");
  }

  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify({ email: normalizedEmail }));
}

export async function logoutUser(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
}

export async function getSession(): Promise<{ email: string } | null> {
  const raw = await AsyncStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}
