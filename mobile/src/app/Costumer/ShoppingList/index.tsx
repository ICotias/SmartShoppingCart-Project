import { styles } from "./styles";
import { useEffect, useState } from "react";
import { ListTab } from "@/components/ListTab";
import { Spacing } from "@/components/Spacing";
import { ListHeader } from "@/components/ListHeader";
import { ItemStorage } from "@/storage/itensStorage";
import { FilterStatus } from "@/@types/filterStatus";
import { View, FlatList, Text, Alert, Modal } from "react-native";
import { CostumerRoutesProps } from "@/routes/CostumerRoutes";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { BackArrow } from "@/assets/BackArrow";
import { AddIcon } from "@/assets/AddIcon";

export function ShoppingList({
  navigation,
  route,
}: CostumerRoutesProps<"shoppinglist">) {
  const [focused, setFocused] = useState<FilterStatus>(FilterStatus.PENDING);
  const [productsList, setProductsList] = useState<ItemStorage[]>([]);
  const listName = route.params.listName;
  const [showAddListModal, setShowAddListModal] = useState(false);
  const [newListName, setNewListName] = useState("");

  async function handleChangeStatus(status: FilterStatus) {
    // const response = await itensStorage.getByStatus(status);
    // setProductsList(response);
    // setFocused(status);
    // console.log("Response: ", response);
    // console.log("Status: ", status);
  }

  async function handleRemove(id: string) {
    // try {
    //   await itensStorage.removeById(id);
    //   await handleChangeStatus(focused);
    // } catch (error) {
    //   console.log(error);
    //   Alert.alert("Remover", "Não foi possível remover a lista.");
    // }
  }

  function handleClear() {
    // Alert.alert("Limpar", "Deseja remover todos?", [
    //   { text: "Não", style: "cancel" },
    //   { text: "Sim", onPress: () => onClear() },
    // ]);
  }

  async function onClear() {
    // try {
    //   await itensStorage.clear();
    //   setProductsList([]);
    // } catch (error) {
    //   Alert.alert("Erro", "Não é possível remover todos as listas.");
    // }
  }

  async function handleToggleListStatus(id: string) {
    // try {
    //   await itensStorage.toggleStatus(id);
    //   await handleChangeStatus(focused);
    // } catch (error) {
    //   console.log(error);
    //   Alert.alert("Erro", "Não foi possível atualizar o status da lista.");
    // }
  }

  // Função que abre o modal para adicionar lista
  function handleOpenAddListModal() {
    setShowAddListModal(true);
    setNewListName("");
  }

  // Função que adiciona um novo lista à lista
  async function handleAddNewList() {
    if (!newListName.trim()) {
      return Alert.alert(
        "Adicionar",
        "Não é permitido a adição de valores vazios"
      );
    }

    // Verifica se já existe um lista com o mesmo nome
    const existingList = productsList.find(
      (item) => item.name.toLowerCase() === newListName.toLowerCase()
    );

    if (existingList) {
      return Alert.alert(
        "Lista já existe",
        "Este lista já está na sua lista de compras"
      );
    }

    const newList: ItemStorage = {
      id: Date.now().toString(),
      name: newListName,
      status: FilterStatus.PENDING,
    };

    setProductsList((prev) => [...prev, newList]);
    setNewListName("");
    setShowAddListModal(false);
  }

  function handleCancelAddList() {
    setNewListName("");
    setShowAddListModal(false);
  }

  useEffect(() => {
    // getItens();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerTop}>
            <Button
              onPress={() => navigation.goBack()}
              variant="addButton"
              content={<BackArrow color="white" width={24} height={24} />}
            />
            <Text style={styles.listTitle}>{listName}</Text>
            <Button
              onPress={handleOpenAddListModal}
              variant="addButton"
              content={<AddIcon color="white" width={24} height={24} />}
            />
          </View>
          <Spacing size="lg" />
        </View>

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
                products={item}
                onRemove={() => handleRemove(item.id)}
                onToggleStatus={() => handleToggleListStatus(item.id)}
                onPress={() => {}}
              />
            )}
            ItemSeparatorComponent={() => (
              <View style={styles.grayBorderBottom}></View>
            )}
            ListEmptyComponent={() => (
              <View style={styles.itensContainer}>
                <Text style={styles.itensText}>
                  Nenhuma lista adicionada ainda
                </Text>
              </View>
            )}
          />
        </View>
      </View>

      <Modal
        visible={showAddListModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelAddList}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Lista</Text>

            <Input
              placeholder="Nome da lista"
              value={newListName}
              onChangeText={setNewListName}
            />

            <Spacing size="md" />

            <View style={styles.modalButtons}>
              <Button
                onPress={handleAddNewList}
                variant="default"
                content="Adicionar"
              />
              <Spacing size="sm" />
              <Button
                onPress={handleCancelAddList}
                variant="white"
                content="Cancelar"
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
