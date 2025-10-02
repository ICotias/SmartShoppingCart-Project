import { styles } from "./styles";
import { useEffect, useState } from "react";
import { ListTab } from "@/components/ListTab";
import { Spacing } from "@/components/Spacing";
import { ListHeader } from "@/components/ListHeader";
import { FilterStatus } from "@/@types/filterStatus";
import { View, FlatList, Text, Alert, Modal } from "react-native";
import { CostumerRoutesProps } from "@/routes/CostumerRoutes";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { BackArrow } from "@/assets/BackArrow";
import { AddIcon } from "@/assets/AddIcon";
import { useShoppingList } from "@/contexts/ShoppingList";
import { FirebaseItem, FirebaseService } from "@/services/firebaseService";

export function ShoppingList({
  navigation,
  route,
}: CostumerRoutesProps<"shoppinglist">) {
  // Estados
  const [focused, setFocused] = useState<FilterStatus>(FilterStatus.PENDING);
  const [productsList, setProductsList] = useState<FirebaseItem[]>([]);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingItem, setIsAddingItem] = useState(false);

  // Parâmetros da navegação
  const listName = route.params.listName;
  const shoppingListId = route.params.shoppingListId;

  // Contexto
  const {
    addProductToShoppingList,
    removeProductFromShoppingList,
    toggleProductStatus,
    clearShoppingList,
    getListItemsByStatus,
  } = useShoppingList();

  // Carregar itens da lista
  async function loadItems() {
    try {
      setIsLoading(true);
      const items = await getListItemsByStatus(shoppingListId, focused);
      setProductsList(items);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar a lista");
    } finally {
      setIsLoading(false);
    }
  }

  // Alterar filtro de status
  async function handleChangeStatus(status: FilterStatus) {
    setFocused(status);
    try {
      const items = await getListItemsByStatus(shoppingListId, status);
      setProductsList(items);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível filtrar os itens");
    }
  }

  // Remover item
  async function handleRemove(itemId: string) {
    try {
      await removeProductFromShoppingList(shoppingListId, itemId);
      await loadItems(); // Recarregar lista
    } catch (error) {
      Alert.alert("Remover", "Não foi possível remover o item.");
    }
  }

  // Limpar lista
  function handleClear() {
    Alert.alert("Limpar", "Deseja remover todos os itens?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => onClear() },
    ]);
  }

  async function onClear() {
    try {
      await clearShoppingList(shoppingListId);
      setProductsList([]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível limpar a lista.");
    }
  }

  // Alterar status do item
  async function handleToggleItemStatus(itemId: string) {
    try {
      await toggleProductStatus(shoppingListId, itemId);
      await loadItems(); // Recarregar lista
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o status.");
    }
  }

  // Abrir modal para adicionar item
  function handleOpenAddItemModal() {
    setShowAddItemModal(true);
    setNewItemName("");
  }

  // Adicionar novo item
  async function handleAddNewItem() {
    if (!newItemName.trim()) {
      return Alert.alert(
        "Adicionar",
        "Não é permitido a adição de valores vazios"
      );
    }

    // Verificar se já existe um item com o mesmo nome
    const existingItem = productsList.find(
      (item) => item.name.toLowerCase() === newItemName.toLowerCase()
    );

    if (existingItem) {
      return Alert.alert(
        "Item já existe",
        "Este item já está na sua lista de compras"
      );
    }

    setIsAddingItem(true);
    try {
      await addProductToShoppingList(shoppingListId, newItemName);
      setNewItemName("");
      setShowAddItemModal(false);
      await loadItems(); // Recarregar lista
    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar o item");
    } finally {
      setIsAddingItem(false);
    }
  }

  // Cancelar adição do item
  function handleCancelAddItem() {
    setNewItemName("");
    setShowAddItemModal(false);
  }

  // Carregar itens quando o componente montar ou o filtro mudar
  useEffect(() => {
    loadItems();
  }, [shoppingListId, focused]);

  // Listener em tempo real para os itens
  useEffect(() => {
    if (!shoppingListId) return;

    const unsubscribe = FirebaseService.subscribeToListItems(
      shoppingListId,
      (items) => {
        // Filtrar itens pelo status atual
        const filteredItems = items.filter((item) => item.status === focused);
        setProductsList(filteredItems);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [shoppingListId, focused]);

  return (
    <>
      <View style={styles.container}>
        {/* Header com botão voltar, nome da lista e botão adicionar */}
        <View style={styles.headerContainer}>
          <View style={styles.headerTop}>
            <Button
              onPress={() => navigation.goBack()}
              variant="addButton"
              content={<BackArrow color="white" width={24} height={24} />}
            />
            <Text style={styles.listTitle}>{listName}</Text>
            <Button
              onPress={handleOpenAddItemModal}
              variant="addButton"
              content={<AddIcon color="white" width={24} height={24} />}
            />
          </View>
          <Spacing size="lg" />
        </View>

        {/* Filtros e lista de itens */}
        <View style={styles.bottomContainer}>
          <ListHeader
            focused={focused}
            onSelect={handleChangeStatus}
            onClear={handleClear}
          />
          <FlatList
            data={productsList}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ListTab
                products={{
                  id: item.id,
                  name: item.name,
                  status: item.status,
                }}
                onRemove={() => handleRemove(item.id)}
                onToggleStatus={() => handleToggleItemStatus(item.id)}
                onPress={() => {}}
              />
            )}
            ItemSeparatorComponent={() => (
              <View style={styles.grayBorderBottom}></View>
            )}
            ListEmptyComponent={() => (
              <View style={styles.itensContainer}>
                <Text style={styles.itensText}>
                  {isLoading ? "Carregando..." : "Nenhum item adicionado ainda"}
                </Text>
              </View>
            )}
          />
        </View>
      </View>

      {/* Modal para adicionar item */}
      <Modal
        visible={showAddItemModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelAddItem}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Item</Text>

            <Input
              placeholder="Nome do item"
              value={newItemName}
              onChangeText={setNewItemName}
              editable={!isAddingItem}
            />

            <Spacing size="md" />

            <View style={styles.modalButtons}>
              <Button
                onPress={handleAddNewItem}
                variant="default"
                content={isAddingItem ? "Adicionando..." : "Adicionar"}
                disabled={isAddingItem}
              />
              <Spacing size="sm" />
              <Button
                onPress={handleCancelAddItem}
                variant="white"
                content="Cancelar"
                disabled={isAddingItem}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
