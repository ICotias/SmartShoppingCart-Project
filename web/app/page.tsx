// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db, auth } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

type ShoppingList = {
  id: string;
  name: string;
};

export default function HomePage() {
  const [lists, setLists] = useState<ShoppingList[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUid(user?.uid ?? null);

      // Se não tem usuário, redireciona para login
      if (!user) {
        router.push("/login");
      }
    });
    return () => unsub();
  }, [router]);

  useEffect(() => {
    async function loadLists() {
      try {
        // Busca TODAS as listas sem filtro
        const snap = await getDocs(collection(db, "shoppingLists"));

        const data: ShoppingList[] = snap.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            name: docData.name ?? "Sem nome",
          };
        });

        setLists(data);
      } catch (err) {
        console.error("Erro ao carregar listas:", err);
        setLists([]);
      } finally {
        setLoading(false);
      }
    }

    loadLists();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      router.push("/login");
    }
  };

  // Mostra loading enquanto verifica autenticação
  if (loading && !uid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">
              Minhas Listas
            </h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Sair</span>
          </Button>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4">
        {loading ? (
          <div className="text-center">
            <p className="text-muted-foreground">Carregando suas listas...</p>
          </div>
        ) : lists && lists.length > 0 ? (
          <div className="w-full max-w-2xl">
            <ul className="divide-y">
              {lists.map((list) => (
                <li
                  key={list.id}
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{list.name}</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" asChild>
                    <Link href={`/lists/${list.id}`}>Abrir</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <FileText className="h-10 w-10 text-muted-foreground" />
              </div>
            </div>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              Nenhuma lista encontrada
            </h2>
            <p className="mx-auto max-w-md text-balance text-muted-foreground">
              Use o aplicativo mobile para criar suas primeiras listas e elas
              aparecerão aqui automaticamente.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
