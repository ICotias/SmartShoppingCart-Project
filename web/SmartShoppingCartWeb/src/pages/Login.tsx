// src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Bug } from "lucide-react";
// Se já tem auth no login, importe aqui conforme seu projeto:
// import { auth } from "@/lib/firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Exemplo de login (se você já tiver sua própria lógica, mantenha a sua)
  const handleLogin = async () => {
    try {
      // await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate("/home");
    } catch (error: any) {
      toast({
        title: "Erro no login",
        description:
          error?.message || "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    }
  };

  // Botão de debug para checar variáveis de ambiente do Firebase (Vite)
  const handleDebugFirebaseConfig = () => {
    const config = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };
    console.log("Firebase config (web/Vite):", config);

    // Feedback visual
    const missing = Object.entries(config)
      .filter(([, v]) => !v)
      .map(([k]) => k);
    toast({
      title: "Debug Firebase Config",
      description:
        missing.length === 0
          ? "Config logada no console. Todos os campos presentes."
          : `Faltando: ${missing.join(", ")}. Verifique seu .env.local.`,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Entrar</h1>
        <p className="text-muted-foreground mb-6">
          Acesse sua conta para ver suas listas.
        </p>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <div className="mt-6 flex items-center gap-2">
          <Button onClick={handleLogin} className="flex-1">
            Entrar
          </Button>

          {/* Botão de debug */}
          <Button
            variant="secondary"
            onClick={handleDebugFirebaseConfig}
            title="Logar config do Firebase no console"
          >
            <Bug className="w-4 h-4 mr-2" />
            Debug Firebase
          </Button>
        </div>

        <div className="mt-4 text-center">
          <button
            className="text-sm text-primary hover:underline"
            onClick={() => navigate("/signup")}
          >
            Criar conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
