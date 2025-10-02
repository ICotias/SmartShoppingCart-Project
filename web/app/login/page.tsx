// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Faz login com email e senha no Firebase
      await signInWithEmailAndPassword(auth, email, password);
      // Redireciona para a página principal após login bem-sucedido
      router.push("/");
    } catch (error: any) {
      console.error("Erro no login:", error);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  // Função para traduzir códigos de erro do Firebase
  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "E-mail inválido";
      case "auth/user-disabled":
        return "Usuário desativado";
      case "auth/user-not-found":
        return "Usuário não encontrado";
      case "auth/wrong-password":
        return "Senha incorreta";
      case "auth/too-many-requests":
        return "Muitas tentativas. Tente novamente mais tarde";
      default:
        return "Erro ao fazer login. Tente novamente.";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <div className="mb-6">
            <h1 className="mb-2 text-2xl font-semibold text-foreground">
              Entrar
            </h1>
            <p className="text-muted-foreground">
              Acesse sua conta para ver suas listas.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="sr-only">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-muted/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="sr-only">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-muted/50"
                required
              />
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full bg-[#1e3a5f] text-white hover:bg-[#152a45] disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
