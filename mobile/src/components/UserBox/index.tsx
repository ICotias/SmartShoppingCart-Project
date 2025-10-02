import { User } from "@/assets/User";
import { View, Text } from "react-native";
import { styles } from "@/components/UserBox/styles";

type UserBoxProps = {
  userName?: string;
};

export function UserBox({ userName = "Usuário" }: UserBoxProps) {
  return (
    <View style={styles.container}>
      <User />
      <Text>Olá, {userName}!</Text>
    </View>
  );
}
