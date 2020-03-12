import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { BottomNavigation } from 'react-native-paper'
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import DatabaseContextProvider, { DatabaseContext } from "./components/DatabaseContext";
import { MapScreen, FeedsScreen, ChatScreen, DashboardScreen, AvoidanceScreen, SymptomsScreen } from "./screens/Screens";

export default class App extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'dashboard', title: 'Dashboard', icon: 'home' },
      { key: 'map', title: 'Map', icon: 'map' },
      { key: 'feeds', title: 'Feeds', icon: 'newspaper' },
      { key: 'avoid', title: 'Avoidance', icon: 'shield' },
      { key: 'chat', title: 'Chat', icon: 'message' },
    ],
  }

  _handleIndexChange = (index) => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    dashboard: DashboardScreen,
    map: MapScreen,
    feeds: FeedsScreen,
    avoid: AvoidanceScreen,
    symptoms: SymptomsScreen,
    chat:ChatScreen,
  });

  render() {
    return (
        <DatabaseContextProvider>
          <BottomNavigation
            barStyle={{backgroundColor:"#f81b4b"}}
            navigationState={this.state}
            onIndexChange={this._handleIndexChange}
            renderScene={this._renderScene}
            keyboardHidesNavigationBar={true}
            labeled={true}
          />
        </DatabaseContextProvider>
    );
  }
}
