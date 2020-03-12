import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import CasesListView from './CasesListView';
import { Header } from "react-native-elements";
import RegionSelector from "./RegionSelector";
import TopOverviewCards from "./TopOverviewCards";
import SelfReport from "./SelfReport";


const headerTitle = () => {
    return (
    <View style={styles.headerTitleWrapper}>
        <Text style={styles.headerTitle}>Track COVID-19</Text>
    </View>
);
    }

class Homescreen extends React.Component {
    static navigationOptions = {
        title: 'Dashboardieee',
    };

    render() {
        return (
            <View style={styles.homescreen}>
                <Header containerStyle={styles.header} centerComponent={headerTitle}></Header>
                <RegionSelector />
                <TopOverviewCards />
                <CasesListView />
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