import 'react-native-gesture-handler';  // IMPORTANT, DO NOT DELETE
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homescreen from "./screens/dashboard/Homescreen";
import Map from "./screens/Map";
import Feeds from "./screens/Feeds";
import Chat from "./screens/Chat";
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import firestore, { callbacks } from "./libraries/Firestore";
import DatabaseContext, { DatabaseContextProvider } from "./src/context";

const Tabs = createBottomTabNavigator();

export default class App extends React.Component {
  render() {
    callbacks.reported.push((snapshot) => { console.log(snapshot.data()); })
    return (
      <DatabaseContextProvider>
        <NavigationContainer>
          <Tabs.Navigator
            initialRouteName="Chat"
          >
            <Tabs.Screen name="Dashboard" component={Homescreen} />
            <Tabs.Screen name="Map" component={Map} />
            <Tabs.Screen name="Feeds" component={Feeds} />
            <Tabs.Screen name="Chat" component={Chat} />
          </Tabs.Navigator>
        </NavigationContainer>
      </DatabaseContextProvider>
    );
  }
}
