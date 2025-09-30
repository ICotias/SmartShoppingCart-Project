import { View, Text, TouchableOpacity } from "react-native";
import { AppLogo } from "@/assets/AppLogo";
import { Input } from "@/components/Input";
import { CheckBox } from "@/components/CheckBox";
import { Button } from "@/components/Button";
import { AuthRoutesProps } from "@/routes/AuthRoutes";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

export function SignUp({ navigation }: AuthRoutesProps<"signup">) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <AppLogo />
        <Text style={styles.title}>Smart ShopingCart</Text>
      </View>
      <Text style={styles.subtitle}>Criar uma conta</Text>
      <Text style={styles.description}>
        Preencha seus dados abaixo para começar suas compras
      </Text>
      <Input
        placeholder="E-mail"
        variant="email"
        keyboardType="email-address"
      />
      <Input placeholder="Nome Completo" variant="user" />

      <Input placeholder="Senha" variant="password" secureTextEntry={true} />

      <Input
        placeholder="Confirmar Senha"
        variant="password"
        secureTextEntry={true}
      />

      <Button content="Registrar" onPress={() => {}} />
      <View style={styles.formContainer}>
        <Text style={styles.haveAnAccount}>Já possui uma conta?</Text>
        <TouchableOpacity
          style={styles.logInContainer}
          onPress={() => navigation.navigate("signin")}
        >
          <Text style={styles.logIn}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
