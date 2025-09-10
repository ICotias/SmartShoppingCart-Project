import { styles } from "@/components/ListTab/styles";
import { Text, View, TouchableOpacity } from "react-native";

import { ItemStorage } from "@/storage/itensStorage";
import { Pending } from "@/assets/Pending";
import { Trash } from "@/assets/Trash";

interface ListTabProps {
  products?: ItemStorage;
  onRemove: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export function ListTab({ products, onRemove, onToggleStatus }: ListTabProps) {
  return (
    <>
      <View style={styles.modal}>
        <View style={styles.container}>
          <View style={styles.stateBox}>
            <TouchableOpacity
              style={styles.leftSection}
              onPress={() => {
                if (products?.id) {
                  onToggleStatus(products.id);
                }
              }}
            >
              <Pending size={20} />
              <Text style={styles.textList}>{products?.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (products?.id) {
                  onRemove(products.id);
                }
              }}
            >
              <Trash size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
