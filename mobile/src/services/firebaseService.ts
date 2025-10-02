import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  query, 
  where,
  orderBy,
  onSnapshot,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import { FilterStatus } from '@/@types/filterStatus';

// Interfaces
export interface FirebaseItem {
  id: string;
  name: string;
  status: FilterStatus;
  listId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FirebaseShoppingList {
  id: string;
  name: string;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Coleções do Firestore
const SHOPPING_LISTS_COLLECTION = 'shoppingLists';
const ITEMS_COLLECTION = 'items';

export class FirebaseService {
  // ==================== LISTAS DE COMPRAS ====================
  
  // Criar nova lista de compras
  static async createShoppingList(name: string, userId: string): Promise<string> {
    try {
      const now = Timestamp.now();
      const docRef = await addDoc(collection(db, SHOPPING_LISTS_COLLECTION), {
        name,
        userId,
        createdAt: now,
        updatedAt: now
      });
      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar lista:', error);
      throw new Error('Não foi possível criar a lista');
    }
  }

  // Buscar listas do usuário
  static async getUserShoppingLists(userId: string): Promise<FirebaseShoppingList[]> {
    try {
      const q = query(
        collection(db, SHOPPING_LISTS_COLLECTION),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(q);
      const lists = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as FirebaseShoppingList));
      
      // Ordenar no cliente para evitar índice composto
      return lists.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
    } catch (error) {
      console.error('Erro ao buscar listas:', error);
      throw new Error('Não foi possível carregar as listas');
    }
  }

  // Deletar lista de compras
  static async deleteShoppingList(listId: string): Promise<void> {
    try {
      // Primeiro, deletar todos os itens da lista
      await this.deleteAllItemsFromList(listId);
      
      // Depois, deletar a lista
      await deleteDoc(doc(db, SHOPPING_LISTS_COLLECTION, listId));
    } catch (error) {
      console.error('Erro ao deletar lista:', error);
      throw new Error('Não foi possível deletar a lista');
    }
  }

  // ==================== ITENS ====================
  
  // Adicionar item à lista
  static async addItemToList(name: string, listId: string): Promise<string> {
    try {
      const now = Timestamp.now();
      const docRef = await addDoc(collection(db, ITEMS_COLLECTION), {
        name,
        listId,
        status: FilterStatus.PENDING,
        createdAt: now,
        updatedAt: now
      });
      return docRef.id;
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      throw new Error('Não foi possível adicionar o item');
    }
  }

  // Buscar itens de uma lista
  static async getListItems(listId: string): Promise<FirebaseItem[]> {
    try {
      const q = query(
        collection(db, ITEMS_COLLECTION),
        where('listId', '==', listId)
      );
      
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as FirebaseItem));
      
      // Ordenar no cliente para evitar índice composto
      return items.sort((a, b) => a.createdAt.toMillis() - b.createdAt.toMillis());
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
      throw new Error('Não foi possível carregar os itens');
    }
  }

  // Buscar itens por status
  static async getListItemsByStatus(listId: string, status: FilterStatus): Promise<FirebaseItem[]> {
    try {
      const q = query(
        collection(db, ITEMS_COLLECTION),
        where('listId', '==', listId),
        where('status', '==', status)
      );
      
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as FirebaseItem));
      
      // Ordenar no cliente para evitar índice composto
      return items.sort((a, b) => a.createdAt.toMillis() - b.createdAt.toMillis());
    } catch (error) {
      console.error('Erro ao buscar itens por status:', error);
      throw new Error('Não foi possível carregar os itens');
    }
  }

  // Atualizar status do item
  static async toggleItemStatus(itemId: string): Promise<void> {
    try {
      const itemRef = doc(db, ITEMS_COLLECTION, itemId);
      const itemDoc = await getDoc(itemRef);
      
      if (!itemDoc.exists()) {
        throw new Error('Item não encontrado');
      }

      const currentStatus = itemDoc.data().status;
      const newStatus = currentStatus === FilterStatus.PENDING 
        ? FilterStatus.BOUGHT 
        : FilterStatus.PENDING;

      await updateDoc(itemRef, {
        status: newStatus,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      throw new Error('Não foi possível atualizar o status do item');
    }
  }

  // Deletar item
  static async deleteItem(itemId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, ITEMS_COLLECTION, itemId));
    } catch (error) {
      console.error('Erro ao deletar item:', error);
      throw new Error('Não foi possível deletar o item');
    }
  }

  // Deletar todos os itens de uma lista
  static async deleteAllItemsFromList(listId: string): Promise<void> {
    try {
      const q = query(
        collection(db, ITEMS_COLLECTION),
        where('listId', '==', listId)
      );
      
      const querySnapshot = await getDocs(q);
      const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
    } catch (error) {
      console.error('Erro ao deletar todos os itens:', error);
      throw new Error('Não foi possível limpar a lista');
    }
  }

  // ==================== LISTENERS EM TEMPO REAL ====================
  
  // Listener para listas do usuário
  static subscribeToUserLists(userId: string, callback: (lists: FirebaseShoppingList[]) => void) {
    const q = query(
      collection(db, SHOPPING_LISTS_COLLECTION),
      where('userId', '==', userId)
    );

    return onSnapshot(q, (querySnapshot) => {
      const lists = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as FirebaseShoppingList));
      
      // Ordenar no cliente para evitar índice composto
      const sortedLists = lists.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
      callback(sortedLists);
    });
  }

  // Listener para itens de uma lista
  static subscribeToListItems(listId: string, callback: (items: FirebaseItem[]) => void) {
    const q = query(
      collection(db, ITEMS_COLLECTION),
      where('listId', '==', listId)
    );

    return onSnapshot(q, (querySnapshot) => {
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as FirebaseItem));
      
      // Ordenar no cliente para evitar índice composto
      const sortedItems = items.sort((a, b) => a.createdAt.toMillis() - b.createdAt.toMillis());
      callback(sortedItems);
    });
  }
}
