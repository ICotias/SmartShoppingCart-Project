// src/services/firestoreLists.ts
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Item {
  id: string;
  name?: string;       // itens podem ter 'name' no mobile/web
  descricao?: string;  // compatível com sua UI web
  status?: string;
}

export interface ShoppingList {
  id: string;
  name: string;
  userId: string;
  createdAt?: unknown;
  updatedAt?: unknown;
  items: Item[];
}

/**
 * Busca uma lista por ID em 'shoppingLists/{listId}' e seus itens em
 * 'shoppingLists/{listId}/items'
 */
export async function fetchShoppingListWithItems(listId: string): Promise<ShoppingList | null> {
  // Documento da lista
  const listRef = doc(db, "shoppingLists", listId);
  const listSnap = await getDoc(listRef);
  if (!listSnap.exists()) return null;

  // Subcoleção de itens
  const itemsRef = collection(db, "shoppingLists", listId, "items");
  const itemsSnap = await getDocs(itemsRef);
  const items = itemsSnap.docs.map((d) => ({ id: d.id, ...d.data() })) as Item[];

  const listData = listSnap.data() as any;

  return {
    id: listSnap.id,
    name: listData.name ?? "Sem nome",
    userId: listData.userId ?? "",
    createdAt: listData.createdAt,
    updatedAt: listData.updatedAt,
    items,
  };
}
