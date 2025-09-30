import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterStatus } from "@/@types/filterStatus";

const ITEMS_STORAGE_KEY = "@comprar:itens";

export interface ItemStorage   {
  id: string; 
  name: string;
  status:FilterStatus
}

async function get(): Promise<ItemStorage[]> {
  try {
    const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);

    return storage ? JSON.parse(storage) : [];
  } catch (error) {
    throw new Error("GET_ITEM " + error);
  }
}

async function getByStatus(status:FilterStatus): Promise<ItemStorage[]>{
    const items = await get()
    return items.filter((item) => item.status === status)

}

async function getByName(name:string): Promise<ItemStorage[]> {
  try {
    const itens = await get();
    return itens.filter((item) => { return item.name});
  } catch (error) {
    throw new Error("GET_BY_NAME " + error);
  }
}

async function save(newItem: ItemStorage): Promise<void> {
  try {
    const itens = await get();
    await AsyncStorage.setItem(
      ITEMS_STORAGE_KEY,
      JSON.stringify([...itens, newItem])
    );
  } catch (error) {
    throw new Error("SAVE_ITEM " + error);
  }
}

async function add(newProduct: ItemStorage): Promise<ItemStorage[]> {
    try {
      const products = await get(); // pega todos os itens salvos
      const updatedProducts = [...products, newProduct]; // adiciona o novo item com id
      await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(updatedProducts));
      return updatedProducts;
    } catch (error) {
      throw new Error("ADD_ITEM " + error);
    }
  }

async function removeById(id: string): Promise<void> {
  try {
    const items = await get();
    const updatedProducts = items.filter((item) => item.id !== id);
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(updatedProducts));
  } catch (error) {
    throw new Error("REMOVE_BY_ID " + error);
  }
}

async function clear(): Promise<void>{
  try{
    await AsyncStorage.removeItem(ITEMS_STORAGE_KEY)
  } catch(error){
    throw new Error("REMOVE_BY_ID " + error);
  }
}

async function toggleStatus(id:string): Promise<ItemStorage[]>{
  const products = await get()

  const updatedProductsListStatus = products.map((item) => item.id === id ? {
    ...item,
    status: item.status === FilterStatus.PENDING
    ? FilterStatus.BOUGHT
    : FilterStatus.PENDING
  }:item)
  await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(updatedProductsListStatus))
  return updatedProductsListStatus
}

export const itensStorage = {
    get,
    add,
    getByName,
    removeById,
    getByStatus,
    clear,
    toggleStatus,
};
