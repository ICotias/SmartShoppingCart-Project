import { FilterStatus } from "@/@types/filterStatus";
import { ItemStorage } from "@/storage/itensStorage";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  FirebaseService,
  FirebaseShoppingList,
  FirebaseItem,
} from "@/services/firebaseService";
import { useAuth } from "./AuthContext";

export interface ShoppingList {
  id: string;
  name: string;
  products: ItemStorage[];
}

interface ShoppingListContextData {
  shoppingLists: FirebaseShoppingList[];
  loading: boolean;
  addShoppingList: (name: string) => Promise<void>;
  removeShoppingList: (shoppingListId: string) => Promise<void>;
  addProductToShoppingList: (
    shoppingListId: string,
    productName: string
  ) => Promise<void>;
  removeProductFromShoppingList: (
    shoppingListId: string,
    productId: string
  ) => Promise<void>;
  toggleProductStatus: (
    shoppingListId: string,
    productId: string
  ) => Promise<void>;
  clearShoppingList: (shoppingListId: string) => Promise<void>;
  getListItems: (listId: string) => Promise<FirebaseItem[]>;
  getListItemsByStatus: (
    listId: string,
    status: FilterStatus
  ) => Promise<FirebaseItem[]>;
}

const ShoppingListContext = createContext<ShoppingListContextData>(
  {} as ShoppingListContextData
);

interface ShoppingListProviderProps {
  children: ReactNode;
}

export function ShoppingListProvider({ children }: ShoppingListProviderProps) {
  const [shoppingLists, setShoppingLists] = useState<FirebaseShoppingList[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  // Carregar listas do usuário quando ele fizer login
  useEffect(() => {
    if (!isAuthenticated || !user?.uid) {
      setShoppingLists([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    // Usar o UID real do usuário autenticado
    const userId = user.uid;

    // Usar listener em tempo real para as listas
    const unsubscribe = FirebaseService.subscribeToUserLists(
      userId,
      (lists) => {
        setShoppingLists(lists);
        setLoading(false);
      }
    );

    // Cleanup do listener
    return () => unsubscribe();
  }, [isAuthenticated, user?.uid]);

  const addShoppingList = async (name: string) => {
    if (!isAuthenticated || !user?.uid)
      throw new Error("Usuário não autenticado");

    try {
      await FirebaseService.createShoppingList(name, user.uid);
      // O listener atualizará automaticamente a lista
    } catch (error) {
      console.error("Erro ao adicionar lista:", error);
      throw error;
    }
  };

  const removeShoppingList = async (shoppingListId: string) => {
    try {
      await FirebaseService.deleteShoppingList(shoppingListId);
      // O listener atualizará automaticamente a lista
    } catch (error) {
      console.error("Erro ao remover lista:", error);
      throw error;
    }
  };

  const addProductToShoppingList = async (
    shoppingListId: string,
    productName: string
  ) => {
    try {
      await FirebaseService.addItemToList(productName, shoppingListId);
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      throw error;
    }
  };

  const removeProductFromShoppingList = async (
    shoppingListId: string,
    productId: string
  ) => {
    try {
      await FirebaseService.deleteItem(productId);
    } catch (error) {
      console.error("Erro ao remover produto:", error);
      throw error;
    }
  };

  const toggleProductStatus = async (
    shoppingListId: string,
    productId: string
  ) => {
    try {
      await FirebaseService.toggleItemStatus(productId);
    } catch (error) {
      console.error("Erro ao alterar status:", error);
      throw error;
    }
  };

  const clearShoppingList = async (shoppingListId: string) => {
    try {
      await FirebaseService.deleteAllItemsFromList(shoppingListId);
    } catch (error) {
      console.error("Erro ao limpar lista:", error);
      throw error;
    }
  };

  const getListItems = async (listId: string): Promise<FirebaseItem[]> => {
    try {
      return await FirebaseService.getListItems(listId);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
      throw error;
    }
  };

  const getListItemsByStatus = async (
    listId: string,
    status: FilterStatus
  ): Promise<FirebaseItem[]> => {
    try {
      return await FirebaseService.getListItemsByStatus(listId, status);
    } catch (error) {
      console.error("Erro ao buscar itens por status:", error);
      throw error;
    }
  };

  return (
    <ShoppingListContext.Provider
      value={{
        shoppingLists,
        loading,
        addShoppingList,
        removeShoppingList,
        addProductToShoppingList,
        removeProductFromShoppingList,
        toggleProductStatus,
        clearShoppingList,
        getListItems,
        getListItemsByStatus,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
}

export function useShoppingList() {
  const context = useContext(ShoppingListContext);
  return context;
}
