import { User } from "@/assets/User";
import { View, Text } from "react-native";

type UserBoxProps = {
  userName?: string;
};

export function UserBox({ userName = "Usuário" }: UserBoxProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "center",
        gap: 5,
      }}
    >
      <User />
      <Text>Olá, {userName}!</Text>
    </View>
  );
}
