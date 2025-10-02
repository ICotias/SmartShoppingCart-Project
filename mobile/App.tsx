// App.tsx (mantendo sua estrutura)
import 'expo-dev-client'

import { NavigationContainer } from '@react-navigation/native'
import { AuthRoutes } from '@/routes/AuthRoutes'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { CostumerRoutes } from '@/routes/CostumerRoutes'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { ShoppingListProvider } from '@/contexts/ShoppingList'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

function AppNavigator() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  SplashScreen.hideAsync()

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
