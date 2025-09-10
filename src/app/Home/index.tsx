import { styles } from "./styles";
import { Input } from "@/components/Input";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { ListTab } from "@/components/ListTab";
import { Spacing } from "@/components/Spacing";
import { ListHeader } from "@/components/ListHeader";
import { ItemStorage } from "@/storage/itensStorage";
import { FilterStatus } from "@/@types/filterStatus";
import { itensStorage } from "@/storage/itensStorage";
import { View, Image, FlatList, Text, Alert } from "react-native";

export function Home() {
  //Estado que define qual lista está em foco
  const [focused, setFocused] = useState<FilterStatus>(FilterStatus.PENDING);
  //Estado que recebe o valor digitado no input
  const [productName, setProductName] = useState<string>("");
  //Estado que guarda os productNames em um array, vulgo lista
  const [productsList, setProductsList] = useState<ItemStorage[]>([]);

  //Função que irá adicionar os novos produtos na lista
  async function handleAddProducts() {
    if (!productName.trim()) {
      return Alert.alert(
        "Adicionar",
        "Não é permitido a adição de valores vázios"
      );
    }

    // Verifica se já existe um item com o mesmo nome
    const existingItem = productsList.find(
      (item) => item.name.toLowerCase() === productName.toLowerCase()
    );

    if (existingItem) {
      return Alert.alert(
        "Item já existe",
        "Este item já está na sua lista de compras"
      );
    }

    const newProduct: ItemStorage = {
      id: productsList.length.toString(),
      name: productName,
      status: FilterStatus.PENDING,
    };
    const updatedProductList = await itensStorage.add(newProduct);
    setProductsList(updatedProductList);
    setProductName("");
    setFocused(FilterStatus.PENDING);
  }

  async function getItens() {
    try {
      const response = await itensStorage.get();
      setProductsList(response);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar a lista");
    }
  }

  async function handleChangeStatus(status: FilterStatus) {
    const response = await itensStorage.getByStatus(status);
    setProductsList(response);
    setFocused(status);
    console.log("Response: ", response);
    console.log("Status: ", status);
  }

  async function handleRemove(id: string) {
    try {
      await itensStorage.removeById(id);
      await handleChangeStatus(focused);
    } catch (error) {
      console.log(error);
      Alert.alert("Remover", "Não foi possível remover o item.");
    }
  }

  function handleClear() {
    Alert.alert("Limpar", "Deseja remover todos?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => onClear() },
    ]);
  }

  async function onClear() {
    try {
      await itensStorage.clear();
      setProductsList([]);
    } catch (error) {
      Alert.alert("Erro", "Não é possível remover todos os itens.");
    }
  }

  async function handleToggleItemStatus(id: string) {
    try {
      await itensStorage.toggleStatus(id);
      await handleChangeStatus(focused);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível atualizar o status.");
    }
  }

  useEffect(() => {
    getItens();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image source={require("@/assets/logo.png")} style={styles.logo} />
          <Spacing size="logo" />
          <Input onChangeText={setProductName} value={productName} />
          <Spacing size="sm" />
          <Button onPress={handleAddProducts} />
        </View>

        <Spacing size="xl" />

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
                onToggleStatus={() => handleToggleItemStatus(item.id)}
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
    </>
  );
}
