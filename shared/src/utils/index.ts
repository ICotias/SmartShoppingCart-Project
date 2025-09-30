import { ItemStorage, FilterStatus } from "../types";

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const filterItemsByStatus = (
  items: ItemStorage[],
  status: FilterStatus
): ItemStorage[] => {
  return items.filter((item) => item.status === status);
};

export const validateItemName = (name: string): boolean => {
  return name.trim().length > 0 && name.trim().length <= 100;
};

export const sortItemsByDate = (items: ItemStorage[]): ItemStorage[] => {
  return items.sort((a, b) => {
    const dateA = new Date(a.createdAt || 0);
    const dateB = new Date(b.createdAt || 0);
    return dateB.getTime() - dateA.getTime();
  });
};
