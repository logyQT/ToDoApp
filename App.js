import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { TodoProvider } from "./src/context/todoContext";
import { HomeScreen } from "./src/views/HomeScreen";
import { AddTodoScreen } from "./src/views/AddTodoScreen";
import { EditTodoScreen } from "./src/views/EditTodoScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TodoProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AddTodo" component={AddTodoScreen} />
            <Stack.Screen name="EditTodo" component={EditTodoScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </TodoProvider>
    </GestureHandlerRootView>
  );
}
