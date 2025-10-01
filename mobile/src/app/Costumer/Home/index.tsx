import { styles } from "./styles";
import { Input } from "@/components/Input";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { ListTab } from "@/components/ListTab";
import { Spacing } from "@/components/Spacing";
import { ItemStorage } from "@/storage/itensStorage";
import { UserBox } from "@/components/UserBox";
import { FilterStatus } from "@/@types/filterStatus";
import { itensStorage } from "@/storage/itensStorage";
import { View, Image, FlatList, Text, Alert, Modal } from "react-native";
import { AppLogo } from "@/assets/AppLogo";
import { AddIcon } from "@/assets/AddIcon";
import { CostumerRoutesProps } from "@/routes/CostumerRoutes";

export function Home({ navigation }: CostumerRoutesProps<"home">) {
  //Estado que define qual lista está em foco
  const [focused, setFocused] = useState<FilterStatus>(FilterStatus.PENDING);
  //Estado que recebe o valor digitado no input
  const [productName, setProductName] = useState<string>("");
  //Estado que guarda os productNames em um array, vulgo lista
  const [productsList, setProductsList] = useState<ItemStorage[]>([]);
  //Estado para controlar qual lista está sendo visualizada
  const [selectedList, setSelectedList] = useState<FilterStatus | null>(null);
  //Estado para armazenar listas com nomes personalizados
  const [customLists, setCustomLists] = useState<
    Array<{ id: string; name: string; type: FilterStatus }>
  >([]);
  //Estado para controlar o modal de adicionar lista
  const [showAddListModal, setShowAddListModal] = useState(false);
  //Estado para o nome da nova lista
  const [newListName, setNewListName] = useState("");

  // Função que abre o modal para adicionar nova lista
  // Reseta o nome da nova lista e exibe o modal
  function handleOpenAddListModal() {
    setShowAddListModal(true);
    setNewListName("");
  }

  // Função que adiciona uma nova lista personalizada
  // Valida o nome, verifica duplicidade e adiciona ao estado
  function handleAddNewList() {
    if (!newListName.trim()) {
      return Alert.alert(
        "Adicionar",
        "Não é permitido a adição de valores vazios"
      );
    }

    // Verifica se já existe uma lista com o mesmo nome
    const existingList = customLists.find(
      (list) => list.name.toLowerCase() === newListName.toLowerCase()
    );

    if (existingList) {
      return Alert.alert(
        "Lista já existe",
        "Já existe uma lista com este nome"
      );
    }

    const newList = {
      id: Date.now().toString(),
      name: newListName,
      type: FilterStatus.PENDING,
    };

    setCustomLists((prev) => [...prev, newList]);
    setNewListName("");
    setShowAddListModal(false);
  }

  // Função para cancelar a adição da lista
  // Fecha o modal e limpa o nome da nova lista
  function handleCancelAddList() {
    setNewListName("");
    setShowAddListModal(false);
  }

  // Função que busca os itens salvos no storage e atualiza o estado da lista de produtos
  async function getItens() {
    try {
      const response = await itensStorage.get();
      setProductsList(response);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar a lista");
    }
  }

  // Função que altera o status do filtro e atualiza a lista de produtos de acordo com o status selecionado
  async function handleChangeStatus(status: FilterStatus) {
    const response = await itensStorage.getByStatus(status);
    setProductsList(response);
    setFocused(status);
    console.log("Response: ", response);
    console.log("Status: ", status);
  }

  // Função que remove um item da lista pelo id e atualiza a lista de acordo com o filtro atual
  async function handleRemove(id: string) {
    try {
      await itensStorage.removeById(id);
      await handleChangeStatus(focused);
    } catch (error) {
      console.log(error);
      Alert.alert("Remover", "Não foi possível remover o item.");
    }
  }

  // Função que exibe um alerta para confirmar a remoção de todos os itens da lista
  function handleClear() {
    Alert.alert("Limpar", "Deseja remover todos?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => onClear() },
    ]);
  }

  // Função que remove todos os itens do storage e limpa a lista de produtos
  async function onClear() {
    try {
      await itensStorage.clear();
      setProductsList([]);
    } catch (error) {
      Alert.alert("Erro", "Não é possível remover todos os itens.");
    }
  }

  // Função que alterna o status de um item (feito/pendente) e atualiza a lista de acordo com o filtro atual
  async function handleToggleItemStatus(id: string) {
    try {
      await itensStorage.toggleStatus(id);
      await handleChangeStatus(focused);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível atualizar o status.");
    }
  }

  // Função que navega para a tela de lista de compras
  function handleOpenList(list: {
    id: string;
    name: string;
    type: FilterStatus;
  }) {
    navigation.navigate("shoppinglist", { listName: list.name });
  }

  // useEffect que executa ao montar o componente para buscar os itens salvos
  useEffect(() => {
    getItens();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <UserBox userName="Iago" />
        <Spacing size="lg" />
        <View style={styles.topContainer}>
          <AppLogo width={50} height={50} />
          <Text style={styles.title}>Smart{"\n"}ShoppingCart</Text>
          <Button
            onPress={handleOpenAddListModal}
            variant="addButton"
            content={<AddIcon color="white" width={24} height={24} />}
          />
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.listTitle}>Minhas Listas</Text>
          <FlatList
            data={customLists}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Button
                onPress={() => handleOpenList(item)}
                variant="white"
                content={item.name}
                color="#2C46B1"
              />
            )}
            ItemSeparatorComponent={() => (
              <View style={styles.grayBorderBottom}></View>
            )}
            ListEmptyComponent={() => (
              <View style={styles.itensContainer}>
                <Text style={styles.itensText}>
                  Vamos começar nossa lista de compras ?
                </Text>
              </View>
            )}
          />
        </View>
      </View>

      {/* Modal para adicionar nova lista */}
      <Modal
        visible={showAddListModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelAddList}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova Lista</Text>

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
                content="Criar Lista"
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
