import "./translations/translations"
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage,DeviceEventEmitter } from 'react-native';
import { BottomNavigation } from 'react-native-paper'
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import DatabaseContextProvider, { DatabaseContext } from "./components/DatabaseContext";
import { MapsScreen, FeedsScreen, ChatScreen, DashboardScreen, VirusInfoScreen } from "./screens/Screens";
import { Header } from "react-native-elements";
import * as Permissions from 'expo-permissions';
import * as Font from 'expo-font';
import i18n from 'i18n-js'
import { fireNotification } from './notifications/notificationRegisterer';

AsyncStorage.getAllKeys().then((keys)=>{
  console.log("ASYNC STORAGE DATA:", keys)
  keys.forEach((key)=>{
    AsyncStorage.getItem(key).then((itemval)=>{
      console.log(key, ":", itemval)
    })
  })
})


export default class App extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'dashboard', title: i18n.t('dashboard'), icon: 'home' },
      { key: 'map', title: i18n.t('map'), icon: 'map' },
      { key: 'feeds', title: i18n.t('news'), icon: 'newspaper' },
      { key: 'virusinfo', title: i18n.t("covid19"), icon: 'atom' },
      { key: 'chat', title: i18n.t('alarms'), icon: 'alert' },
    ],
    lang:""
  }

  async componentDidMount() {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
    this.langListener = DeviceEventEmitter.addListener("langChange", this.changeLang)
  }

  changeLang(lang){
    console.log("GOTCHA", lang)
    i18n.locale = lang.lang;
    this.setState({lang:lang.lang});
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
          <Header containerStyle={styles.header} centerComponent={<View style={styles.headerTitleWrapper}><Text style={styles.headerTitle}>{i18n.t('appHeader')}</Text></View>}></Header>
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
    fontSize: 24,
    color: "#ededed",
  },
  headerTitleWrapper: {
    alignItems: "center",
    justifyContent: "center",
  }
})