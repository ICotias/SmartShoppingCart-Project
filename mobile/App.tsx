import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "@/routes/AuthRoutes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CostumerRoutes } from "@/routes/CostumerRoutes";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <CostumerRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}

export function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
