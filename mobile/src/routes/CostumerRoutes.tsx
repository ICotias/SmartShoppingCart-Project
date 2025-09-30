import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { Home } from "@/app/Costumer/Home";

export type CostumerRoutesList = {
  home: undefined;
};

export type CostumerRoutesProps<T extends keyof CostumerRoutesList> =
  NativeStackScreenProps<CostumerRoutesList, T>;

const Stack = createNativeStackNavigator<CostumerRoutesList>();

export function CostumerRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
}
