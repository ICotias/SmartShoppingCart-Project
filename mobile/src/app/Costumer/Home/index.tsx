import { styles } from "./styles";
import { Input } from "@/components/Input";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Spacing } from "@/components/Spacing";
import { UserBox } from "@/components/UserBox";
import {
  View,
  FlatList,
  Text,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import { AppLogo } from "@/assets/AppLogo";
import { AddIcon } from "@/assets/AddIcon";
import { CostumerRoutesProps } from "@/routes/CostumerRoutes";
import { useShoppingList } from "@/contexts/ShoppingList";
import { FirebaseShoppingList } from "@/services/firebaseService";
import { useAuth } from "@/contexts/AuthContext";

export function Home({ navigation }: CostumerRoutesProps<"home">) {
  const { shoppingLists, addShoppingList, loading } = useShoppingList();
  const [showAddListModal, setShowAddListModal] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [isAddingList, setIsAddingList] = useState(false);
  const { logout } = useAuth();

  function handleOpenAddListModal() {
    setShowAddListModal(true);
    setNewListName("");
  }

  async function handleAddNewList() {
    if (!newListName.trim()) {
      return Alert.alert(
        "Adicionar",
        "Não é permitido a adição de valores vazios"
      );
    }

    const existingList = shoppingLists?.find(
      (list) => list.name.toLowerCase() === newListName.toLowerCase()
    );

    if (existingList) {
      return Alert.alert(
        "Lista já existe",
        "Já existe uma lista com este nome"
      );
    }

    setIsAddingList(true);
    try {
      await addShoppingList(newListName);
      setNewListName("");
      setShowAddListModal(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a lista");
    } finally {
      setIsAddingList(false);
    }
  }

  function handleCancelAddList() {
    setNewListName("");
    setShowAddListModal(false);
  }

  function handleOpenList(list: FirebaseShoppingList) {
    navigation.navigate("shoppinglist", {
      listName: list.name,
      shoppingListId: list.id,
    });
  }

  function handleLogout() {
    Alert.alert("Sair", "Tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", style: "destructive", onPress: logout },
    ]);
  }

  useEffect(() => {}, []);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
          <UserBox />
        </TouchableOpacity>
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
            data={shoppingLists}
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
                content={isAddingList ? "Criando..." : "Criar Lista"}
                disabled={isAddingList}
              />
              <Spacing size="sm" />
              <Button
                onPress={handleCancelAddList}
                variant="white"
                content="Cancelar"
                disabled={isAddingList}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
