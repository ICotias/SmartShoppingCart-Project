import { FilterStatus } from '@/@types/filterStatus'
import { ItemStorage } from '@/storage/itensStorage'
import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface ShoppingList {
  id: string
  name: string
  products: ItemStorage[]
}

interface ShoppingListContextData {
  shoppingLists: ShoppingList[]
  addShoppingList: (newShoppingList: ShoppingList) => void
  removeShoppingList: (shoppingListId: string) => void
  addProductToShoppingList: (
    shoppingListId: string,
    newProduct: ItemStorage
  ) => void
  removeProductFromShoppingList: (
    shoppingListId: string,
    productId: string
  ) => void
  handleChangeProductStatus: (
    shoppingListId: string,
    productId: string,
    status: FilterStatus
  ) => void
  handleClearShoppingList: (shoppingListId: string) => void
}

const ShoppingListContext = createContext<ShoppingListContextData>(
  {} as ShoppingListContextData
)

interface ShoppingListProviderProps {
  children: ReactNode
}

export function ShoppingListProvider({ children }: ShoppingListProviderProps) {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([])

  const addShoppingList = (newShoppingList: ShoppingList) => {
    setShoppingLists((prev) => [...prev, newShoppingList])
  }

  const removeShoppingList = (shoppingListId: string) => {
    setShoppingLists(
      shoppingLists?.filter((list) => list.id !== shoppingListId)
    )
  }

  const addProductToShoppingList = (
    shoppingListId: string,
    newProduct: ItemStorage
  ) => {
    setShoppingLists(
      shoppingLists.map((list) =>
        list.id === shoppingListId
          ? { ...list, products: [...list.products, newProduct] }
          : list
      )
    )
  }

  const removeProductFromShoppingList = (
    shoppingListId: string,
    productId: string
  ) => {
    setShoppingLists(
      shoppingLists.map((list) =>
        list.id === shoppingListId
          ? {
              ...list,
              products: list.products.filter(
                (product) => product.id !== productId
              ),
            }
          : list
      )
    )
  }

  const handleChangeProductStatus = (
    shoppingListId: string,
    productId: string,
    status: FilterStatus
  ) => {
    setShoppingLists(
      shoppingLists.map((list) =>
        list.id === shoppingListId
          ? {
              ...list,
              products: list.products.map((product) =>
                product.id === productId ? { ...product, status } : product
              ),
            }
          : list
      )
    )
  }

  const handleClearShoppingList = (shoppingListId: string) => {
    setShoppingLists(
      shoppingLists.map((list) =>
        list.id === shoppingListId ? { ...list, products: [] } : list
      )
    )
  }

  return (
    <ShoppingListContext.Provider
      value={{
        shoppingLists,
        addShoppingList,
        removeShoppingList,
        addProductToShoppingList,
        removeProductFromShoppingList,
        handleChangeProductStatus,
        handleClearShoppingList,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  )
}

export function useShoppingList() {
  const context = useContext(ShoppingListContext)
  return context
}
