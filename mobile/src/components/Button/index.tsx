import { Text, TouchableOpacity } from "react-native";
import { ReactNode } from "react";
import { styles } from "./styles";

type buttonVariants = "default" | "red" | "white" | "addButton";
interface buttonProps {
  onPress: () => void;
  variant?: buttonVariants;
  content: string | ReactNode;
  disabled?: boolean;
}

export function Button({ onPress, variant = "default", content }: buttonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={
        variant == "white" ? 0.2 : variant == "addButton" ? 0.3 : 0.4
      }
      style={
        variant == "white"
          ? styles.whiteButton
          : variant == "addButton"
          ? styles.addButton
          : styles.blueButton
      }
    >
      {typeof content === "string" ? (
        <Text
          style={
            variant == "white" ? styles.whiteButtonText : styles.blueButtonText
          }
        >
          {content}
        </Text>
      ) : (
        content
      )}
    </TouchableOpacity>
  );
}
