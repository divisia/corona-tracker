import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { BottomNavigation } from 'react-native-paper'
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import DatabaseContextProvider, { DatabaseContext } from "./components/DatabaseContext";
import { MapScreen, FeedsScreen, ChatScreen, DashboardScreen, VirusInfoScreen } from "./screens/Screens";
import { Header } from "react-native-elements";


export default class App extends React.Component {
  state = {
    index: 3,
    routes: [
      { key: 'dashboard', title: 'Dashboard', icon: 'home' },
      { key: 'map', title: 'Map', icon: 'map' },
      { key: 'feeds', title: 'Feeds', icon: 'newspaper' },
      { key: 'virusinfo', title: 'COVID-19', icon: 'atom' },
      { key: 'chat', title: 'Chat', icon: 'message' },
    ],
  }

  _handleIndexChange = (index) => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    dashboard: DashboardScreen,
    map: MapScreen,
    feeds: FeedsScreen,
    virusinfo: VirusInfoScreen,
    chat: ChatScreen,
  });

  render() {
    return (
      <DatabaseContextProvider>
        <View style={{ alignItems: "stretch", justifyContent: "center", flex: 1 }}>
          <Header containerStyle={styles.header} centerComponent={<View style={styles.headerTitleWrapper}><Text style={styles.headerTitle}>Track COVID-19</Text></View>}></Header>
          <BottomNavigation
            barStyle={{ backgroundColor: "#f81b4b" }}
            navigationState={this.state}
            onIndexChange={this._handleIndexChange}
            renderScene={this._renderScene}
            keyboardHidesNavigationBar={true}
            labeled={true}
          />
        </View>
      </DatabaseContextProvider>
    );
  }
}


const styles = StyleSheet.create({
  header: {
    flexDirection: "column",
    backgroundColor: "#f81b4b",
  },
  headerTitle: {
    fontSize: 20,
  },
  headerTitleWrapper: {
    alignItems: "center",
    justifyContent: "center",
  }
})