import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Pending } from "@/assets/Pending";
import { Bought } from "@/assets/Bought";
import { FilterStatus } from "@/@types/filterStatus";

type ListHeaderProps = {
  focused: FilterStatus;
  onSelect: (tab: FilterStatus) => void;
  onClear?: () => void;
};

export function ListHeader({ focused, onSelect, onClear }: ListHeaderProps) {
  return (
    <>
      <View style={styles.modal}>
        <View style={styles.container}>
          <View style={styles.stateBox}>
            <View style={styles.leftSection}>
              <TouchableOpacity
                onPress={() => onSelect(FilterStatus.PENDING)}
                style={styles.buttons}
              >
                <Pending
                  size={20}
                  opacity={focused === FilterStatus.PENDING ? 1 : 0.5}
                />
                <Text
                  style={[
                    styles.textList,
                    { opacity: focused === FilterStatus.PENDING ? 1 : 0.5 },
                  ]}
                >
                  Pendentes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onSelect(FilterStatus.BOUGHT)}
                style={styles.buttons}
              >
                <Bought
                  size={20}
                  color={"#2C46B1"}
                  opacity={focused === FilterStatus.BOUGHT ? 1 : 0.5}
                />
                <Text
                  style={[
                    styles.textList,
                    { opacity: focused === FilterStatus.BOUGHT ? 1 : 0.5 },
                  ]}
                >
                  Comprados
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onClear}>
              <Text style={[styles.textList, { color: "gray" }]}>Limpar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.grayBorderBottom}></View>
    </>
  );
}
