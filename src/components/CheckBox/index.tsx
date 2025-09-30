import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/components/CheckBox/styles";
import { Check } from "@/assets/Check";
import { useState } from "react";

export function CheckBox() {
  const [isFocused, setIsFocused] = useState(false);
  function toggleCheckBox() {
    {
      if (isFocused == true) {
        setIsFocused(false);
      } else if (isFocused == false) {
        setIsFocused(true);
      }
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={isFocused == true ? styles.checkBoxOn : styles.checkBoxOff}
        onPress={() => toggleCheckBox()}
      >
        <Check color="white" />
      </TouchableOpacity>
      <Text style={styles.remindMe}>Lembrar de mim</Text>
    </View>
  );
}
