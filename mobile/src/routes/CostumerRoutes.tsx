import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'

import { Home } from '@/app/Costumer/Home'
import { ShoppingList } from '@/app/Costumer/ShoppingList'

export type CostumerRoutesList = {
  home: undefined
  shoppinglist: { shoppingListId: string }
}

export type CostumerRoutesProps<T extends keyof CostumerRoutesList> =
  NativeStackScreenProps<CostumerRoutesList, T>

const Stack = createNativeStackNavigator<CostumerRoutesList>()

export function CostumerRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='home'
    >
      <Stack.Screen name='home' component={Home} />
      <Stack.Screen name='shoppinglist' component={ShoppingList} />
    </Stack.Navigator>
  )
}
