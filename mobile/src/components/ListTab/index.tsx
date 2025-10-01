// src/components/ListTab/index.tsx
import { styles } from "@/components/ListTab/styles";
import { Text, View, TouchableOpacity } from "react-native";
import { ItemStorage } from "@/storage/itensStorage";
import { FilterStatus } from "@/@types/filterStatus";
import { Pending } from "@/assets/Pending";
import { Trash } from "@/assets/Trash";
import { Bought } from "@/assets/Bought"; // ícone para itens comprados (ajuste o caminho se necessário)

interface ListTabProps {
  products: ItemStorage; // torne obrigatório para simplificar
  onRemove: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onPress?: () => void; // opcional
}

export function ListTab({
  products,
  onRemove,
  onToggleStatus,
  onPress,
}: ListTabProps) {
  const isBought = products.status === FilterStatus.BOUGHT;

  return (
    <View style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.stateBox}>
          <TouchableOpacity
            style={styles.leftSection}
            onPress={() => {
              onToggleStatus(products.id); // alterna status
              onPress?.(); // ação extra opcional
            }}
            activeOpacity={0.8}
          >
            {isBought ? <Bought size={20} /> : <Pending size={20} />}
            <Text style={[styles.textList, isBought && styles.textBought]}>
              {products.name}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onRemove(products.id)}
            activeOpacity={0.8}
          >
            <Trash size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
