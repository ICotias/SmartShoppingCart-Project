// app/lists/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

interface Item {
  id: string;
  name: string;
  status: string;
}

export default function ListDetailPage() {
  const params = useParams();
  const router = useRouter();
  const listId = params.id as string;

  const [list, setList] = useState<any>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadListData() {
      try {
        // Buscar dados da lista
        const listDoc = await getDoc(doc(db, "shoppingLists", listId));
        if (listDoc.exists()) {
          setList({ id: listDoc.id, ...listDoc.data() });
        }

        // Buscar itens da lista
        const itemsQuery = query(
          collection(db, "items"),
          where("listId", "==", listId)
        );
        const itemsSnap = await getDocs(itemsQuery);
        const itemsData = itemsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Item[];

        setItems(itemsData);
      } catch (error) {
        console.error("Erro ao carregar lista:", error);
      } finally {
        setLoading(false);
      }
    }

    if (listId) {
      loadListData();
    }
  }, [listId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Carregando lista...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">
              {list?.name || "Lista"}
            </h1>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">
            Itens da Lista ({items.length})
          </h2>
          {items.length > 0 ? (
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.id} className="p-3 border rounded-lg bg-white">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Status: {item.status === "BOUGHT" ? "Comprado" : "Pendente"}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhum item nesta lista</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
