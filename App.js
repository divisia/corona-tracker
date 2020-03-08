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
import * as firebase from 'firebase';

const Tabs = createBottomTabNavigator();

const firebaseConfig={
  apiKey:"AIzaSyCx-v48R2T0yWQcrcOhvSrfCrUg5b1tw0k",
  projectId:"corona-tracker-app"
};

firebase.initializeApp(firebaseConfig); 
const DB = firebase.firestore();


export default class App extends React.Component {
  render(){
    return (
      <NavigationContainer>
        <Tabs.Navigator
          initialRouteName="Feeds"
        >
          <Tabs.Screen DB={DB} name="Dashboard" component={Homescreen} />
          <Tabs.Screen DB={DB} name="Map" component={Map} />
          <Tabs.Screen DB={DB} name="Feeds" component={Feeds} />
          <Tabs.Screen DB={DB} name="Chat" component={Chat} />
        </Tabs.Navigator>
      </NavigationContainer>
    );
  }
}
