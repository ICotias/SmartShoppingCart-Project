import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

interface Item {
  id: string;
  nome: string;
  descricao: string;
}

interface Lista {
  id: string;
  nome: string;
  itens: Item[];
}

interface ListCardProps {
  lista: Lista;
}

const ListCard = ({ lista }: ListCardProps) => {
  return (
    <Card className="group hover:shadow-elevated transition-smooth cursor-pointer border-border/50 hover:border-primary/30 overflow-hidden">
      <div className="h-2 bg-gradient-primary" />
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-smooth">
              {lista.nome}
            </CardTitle>
            <CardDescription className="mt-2">
              <Badge variant="secondary" className="font-normal">
                {lista.itens.length} {lista.itens.length === 1 ? "item" : "itens"}
              </Badge>
            </CardDescription>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-smooth" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {lista.itens.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">Lista vazia</p>
        ) : (
          <div className="space-y-2">
            {lista.itens.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-smooth"
              >
                <p className="font-medium text-sm text-foreground">{item.nome}</p>
                {item.descricao && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {item.descricao}
                  </p>
                )}
              </div>
            ))}
            {lista.itens.length > 3 && (
              <p className="text-xs text-muted-foreground text-center pt-2">
                + {lista.itens.length - 3} itens adicionais
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ListCard;
