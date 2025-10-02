// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Loader2 } from "lucide-react";
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { fetchShoppingListWithItems, ShoppingList } from "@/lib/firebaseList";

const FIXED_LIST_ID = "Ws3kTXR8Ik9MrkakFNAT";

const Home = () => {
  const [list, setList] = useState<ShoppingList | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchShoppingListWithItems(FIXED_LIST_ID);
        setList(data);
      } catch (error) {
        console.error("Erro ao carregar lista:", error);
        toast({
          title: "Erro ao carregar lista",
          description: "Verifique o ID e as permissões do Firestore.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [toast]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: "Logout realizado", description: "Até logo!" });
      navigate("/login");
    } catch {
      toast({
        title: "Erro ao sair",
        description: "Ocorreu um erro ao fazer logout.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-foreground">Minha Lista</h1>
            {auth.currentUser?.email && (
              <p className="text-sm text-muted-foreground">
                {auth.currentUser.email}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/login")}
              className="transition-smooth hover:bg-primary/10"
            >
              Voltar para login
            </Button>
            {auth.currentUser && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="transition-smooth hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!list ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Lista não encontrada
            </h2>
            <p className="text-muted-foreground">
              Nenhuma lista encontrada. Vamos criar uma nova ?
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 bg-card border border-border rounded-lg p-4">
              <h2 className="text-xl font-semibold text-foreground">
                {list.name}
              </h2>
              <p className="text-sm text-muted-foreground">ID: {list.id}</p>
              <p className="text-sm text-muted-foreground">
                User: {list.userId}
              </p>
            </div>

            {list.items.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum item nesta lista.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {list.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card border border-border rounded-lg p-4"
                  >
                    <h3 className="font-medium text-foreground">
                      {item.name ?? item.descricao ?? "Item"}
                    </h3>
                    {item.descricao && (
                      <p className="text-sm text-muted-foreground">
                        {item.descricao}
                      </p>
                    )}
                    {item.status && (
                      <p className="text-sm text-muted-foreground">
                        Status: {item.status}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
