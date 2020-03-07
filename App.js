import 'react-native-gesture-handler';  // IMPORTANT, DO NOT DELETE
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Header } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Loading from "./screens/Loading";
import Homescreen from "./screens/Homescreen";

const Stack = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="Loading" component={Loading} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  homescreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
