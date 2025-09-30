import { View, TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";
import { Password } from "@/assets/Password";
import { Email } from "@/assets/Email";
import { useState } from "react";
import { User } from "@/assets/User";

type InputVariants = "default" | "email" | "password" | "user";

interface InputProps extends TextInputProps {
  variant?: InputVariants;
}

const variantIcons = {
  default: null,
  email: Email,
  password: Password,
  user: User,
};

export function Input({
  onChangeText,
  value,
  placeholder,
  variant = "default",
  keyboardType,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const IconComponent = variantIcons[variant];
  return (
    <View style={[styles.container, isFocused && styles.containerFocused]}>
      <TextInput
        style={styles.text}
        placeholder={placeholder}
        placeholderTextColor={"#1E1E1E"}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
      {IconComponent && <IconComponent width={20} height={20} color="black" />}
    </View>
  );
}
