import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import CasesListView from './CasesListView';
import RegionSelector from "./RegionSelector";
import TopOverviewCards from "./TopOverviewCards";
import SelfReport from "./SelfReport";
import LangSwitch from './LangSwitch'


class Homescreen extends React.Component {
    static navigationOptions = {
        title: 'Dashboardieee',
    };

    render() {
        return (
            <View style={styles.homescreen}>
                <RegionSelector />
                <TopOverviewCards />
                <CasesListView />
                {/** <LangSwitch /> **/}
                <SelfReport />
            </View>
        );
    }

};

const styles = StyleSheet.create({
    homescreen: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "stretch",
    },
    header: {
        flexDirection: "column",
        backgroundColor:"#f81b4b"
    },
    headerTitle:{
        fontSize:20,
    },
    headerTitleWrapper:{
        alignItems:"center",
        justifyContent:"center",
    }
});

export default Homescreen;