export enum FilterStatus {
  PENDING = "pending",
  BOUGHT = "bought",
}

export interface ItemStorage {
  id: string;
  name: string;
  status: FilterStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface ShoppingList {
  id: string;
  name: string;
  items: ItemStorage[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
