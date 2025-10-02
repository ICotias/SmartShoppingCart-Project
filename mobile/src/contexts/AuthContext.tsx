// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "@/config/firebase";

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Listener inicia apenas após App → AuthProvider estar montado
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser ?? null);
      setLoading(false);
    });

    // Clean-up no unmount evita leaks
    return () => unsubscribe();
  }, []);

  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error: any) {
      console.error("Erro no login:", error);
      // Evita quebrar se error.code não existir
      throw new Error(getAuthErrorMessage(error?.code));
    } finally {
      setLoading(false);
    }
  }

  async function register(email: string, password: string) {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error: any) {
      console.error("Erro no registro:", error);
      throw new Error(getAuthErrorMessage(error?.code));
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Erro no logout:", error);
      throw new Error("Não foi possível fazer logout");
    } finally {
      setLoading(false);
    }
  }

  function getAuthErrorMessage(errorCode?: string): string {
    switch (errorCode) {
      case "auth/user-not-found":
        return "Usuário não encontrado";
      case "auth/wrong-password":
        return "Senha incorreta";
      case "auth/email-already-in-use":
        return "Este email já está em uso";
      case "auth/weak-password":
        return "A senha deve ter pelo menos 6 caracteres";
      case "auth/invalid-email":
        return "Email inválido";
      case "auth/too-many-requests":
        return "Muitas tentativas. Tente novamente mais tarde";
      default:
        return "Erro de autenticação";
    }
  }

  const value = useMemo<AuthContextData>(
    () => ({
      user,
      isAuthenticated: !!user,
      loading,
      login,
      logout,
      register,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return ctx;
}
