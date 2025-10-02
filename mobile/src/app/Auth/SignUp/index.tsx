// src/app/Auth/SignUp/index.tsx
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { AppLogo } from "@/assets/AppLogo";
import { Input } from "@/components/Input";
import { CheckBox } from "@/components/CheckBox";
import { Button } from "@/components/Button";
import { AuthRoutesProps } from "@/routes/AuthRoutes";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function SignUp({ navigation }: AuthRoutesProps<"signup">) {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleRegister() {
    if (submitting) return;
    setSubmitting(true);
    try {
      if (password !== confirm) {
        throw new Error(); // genérico
      }
      await register(email.trim(), password);
      // AppNavigator trocará para CostumerRoutes automaticamente
    } catch {
      Alert.alert(
        "Falha ao registrar",
        "Verifique os dados e tente novamente."
      );
    } finally {
      setSubmitting(false);
    }
  }

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
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Input
        placeholder="Senha"
        variant="password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Input
        placeholder="Confirmar Senha"
        variant="password"
        secureTextEntry={true}
        value={confirm}
        onChangeText={setConfirm}
      />
      <Button
        content={submitting ? "Registrando..." : "Registrar"}
        onPress={handleRegister}
        disabled={submitting}
      />
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
