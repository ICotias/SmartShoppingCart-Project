import { NavigationContainer } from '@react-navigation/native'
import { AuthRoutes } from '@/routes/AuthRoutes'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { CostumerRoutes } from '@/routes/CostumerRoutes'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { ShoppingListProvider } from '@/contexts/ShoppingList'

function AppNavigator() {
  const { isAuthenticated } = useAuth()

  return (
    <NavigationContainer>
      {isAuthenticated ? <CostumerRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}

export function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ShoppingListProvider>
          <AppNavigator />
        </ShoppingListProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}
