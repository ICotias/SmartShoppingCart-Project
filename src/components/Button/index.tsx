import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface buttonProps {
  onPress: () => void;
}

export function Button({ onPress }: buttonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.container}
    >
      <Text style={styles.text}>Adicionar</Text>
    </TouchableOpacity>
  );
}
