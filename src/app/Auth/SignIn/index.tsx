import { View, Text, TouchableOpacity } from "react-native";
import { AppLogo } from "@/assets/AppLogo";
import { Input } from "@/components/Input";
import { CheckBox } from "@/components/CheckBox";
import { Button } from "@/components/Button";
import { AuthRoutesProps } from "@/routes/AuthRoutes";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { useAuth } from "@/contexts/AuthContext";

export function SignIn({ navigation }: AuthRoutesProps<"signin">) {
  const { login } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <AppLogo />
        <Text style={styles.title}>Smart ShopingCart</Text>
      </View>
      <Text style={styles.subtitle}>Entrar na sua conta</Text>
      <Input
        placeholder="E-mail"
        variant="email"
        keyboardType="email-address"
      />
      <Input placeholder="Senha" variant="password" secureTextEntry={true} />

      <View style={styles.formContainer}>
        <CheckBox />
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Esqueci a senha</Text>
        </TouchableOpacity>
      </View>
      <Button
        content="Entrar"
        onPress={() => {
          login();
        }}
      />
      <Button
        content="Criar Conta"
        variant="white"
        onPress={() => {
          navigation.navigate("signup");
        }}
      />
    </SafeAreaView>
  );
}
