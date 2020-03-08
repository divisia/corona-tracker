import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import CasesListView from './CasesListView';
import { Header } from "react-native-elements";
import RegionSelector from "./RegionSelector"
import TopOverviewCards from "./TopOverviewCards"
import SelfReport from "./SelfReport"
import AutocompleteExample from "./Example"


const Homescreen = (props) => {
    let { navigation } = (props);
    return (
        <View style={styles.homescreen}>
            <Header containerStyle={styles.header} centerComponent={<Text>COVID Tracker</Text>}></Header>
            <RegionSelector/>
            <TopOverviewCards />
            <CasesListView />
            <SelfReport />
        </View>
    );
};

const styles = StyleSheet.create({
    homescreen: {
        flex: 1,
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"stretch",
    },
    header:{
        flexDirection:"column",
    }
});

export default Homescreen;