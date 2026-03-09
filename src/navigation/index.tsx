import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FormProvider } from "../FormContext";

import FormScreen from "../screens/FormScreen";
import ListScreen from "../screens/ListScreen";
import PreviewScreen from "../screens/PreviewScreen";

import { RootStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <FormProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="FormScreen">
          <Stack.Screen
            name="FormScreen"
            component={FormScreen}
            options={{ title: "Formulário" }}
          />
          <Stack.Screen
            name="PreviewScreen"
            component={PreviewScreen}
            options={{ title: "Preview" }}
          />
          <Stack.Screen
            name="ListScreen"
            component={ListScreen}
            options={{ title: "Usuários" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FormProvider>
  );
}