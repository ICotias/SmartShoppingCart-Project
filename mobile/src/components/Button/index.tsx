import { Text, TouchableOpacity } from "react-native";
import { ReactNode } from "react";
import { styles } from "./styles";

type buttonVariants = "default" | "red" | "white" | "addButton";
interface buttonProps {
  onPress: () => void;
  variant?: buttonVariants;
  content: string | ReactNode;
  disabled?: boolean;
  color?: string;
}

export function Button({
  onPress,
  variant = "default",
  content,
  color,
}: buttonProps) {
  // Função para obter o estilo do botão baseado no variant e propriedades customizadas
  const getButtonStyle = () => {
    const baseStyle =
      variant === "white"
        ? styles.whiteButton
        : variant === "addButton"
        ? styles.addButton
        : styles.blueButton;

    const customStyle: any = {};

    if (color) {
      customStyle.borderColor = color;
      customStyle.borderWidth = 1;
    }

    return [baseStyle, customStyle];
  };

  // Função para obter o estilo do texto baseado no variant e cor customizada
  const getTextStyle = () => {
    const baseStyle =
      variant === "white" ? styles.whiteButtonText : styles.blueButtonText;

    const customStyle: any = {};

    if (color) {
      customStyle.color = color;
    }

    return [baseStyle, customStyle];
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={
        variant == "white" ? 0.2 : variant == "addButton" ? 0.3 : 0.4
      }
      style={getButtonStyle()}
    >
      {typeof content === "string" ? (
        <Text style={getTextStyle()}>{content}</Text>
      ) : (
        content
      )}
    </TouchableOpacity>
  );
}
