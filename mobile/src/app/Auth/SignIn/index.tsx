// src/app/Auth/SignIn/index.tsx
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { AppLogo } from "@/assets/AppLogo";
import { Input } from "@/components/Input";
import { CheckBox } from "@/components/CheckBox";
import { Button } from "@/components/Button";
import { AuthRoutesProps } from "@/routes/AuthRoutes";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { useAuth } from "@/contexts/AuthContext";
import React, { useState } from "react";

export function SignIn({ navigation }: AuthRoutesProps<"signin">) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSignIn() {
    if (submitting) return;
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      // AppNavigator trocará para CostumerRoutes automaticamente
    } catch {
      Alert.alert(
        "Falha ao entrar",
        "Verifique suas credenciais e tente novamente."
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
      <Text style={styles.subtitle}>Entrar na sua conta</Text>
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
      <View style={styles.formContainer}>
        <CheckBox />
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Esqueci a senha</Text>
        </TouchableOpacity>
      </View>
      <Button
        content={submitting ? "Entrando..." : "Entrar"}
        onPress={handleSignIn}
        disabled={submitting}
      />
      <Button
        content="Criar Conta"
        variant="white"
        onPress={() => navigation.navigate("signup")}
      />
    </SafeAreaView>
  );
}
