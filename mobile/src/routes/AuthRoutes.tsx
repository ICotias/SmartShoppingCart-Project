import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { SignIn } from "@/app/Auth/SignIn";
import { SignUp } from "@/app/Auth/SignUp";

export type AuthRoutesList = {
  signin: undefined;
  signup: undefined;
};

export type AuthRoutesProps<T extends keyof AuthRoutesList> =
  NativeStackScreenProps<AuthRoutesList, T>;

const Stack = createNativeStackNavigator<AuthRoutesList>();

export function AuthRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "fade" }}
      initialRouteName="signin"
    >
      <Stack.Screen name="signin" component={SignIn} />
      <Stack.Screen name="signup" component={SignUp} />
    </Stack.Navigator>
  );
}
