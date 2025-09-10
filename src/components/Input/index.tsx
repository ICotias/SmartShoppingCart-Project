import { View, TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";

export function Input({ onChangeText, value, ...rest }: TextInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.text}
        placeholder="O que você precisa comprar? "
        placeholderTextColor={"#1E1E1E"}
        onChangeText={onChangeText}
        value={value}
        {...rest}
      />
    </View>
  );
}
