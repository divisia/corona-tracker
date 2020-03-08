import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import CasesListView from './CasesListView';
import { Header } from "react-native-elements";
import RegionSelector from "./RegionSelector";
import TopOverviewCards from "./TopOverviewCards";
import SelfReport from "./SelfReport";
import AutocompleteExample from "./Example";
import firestore from "../../libraries/Firestore";


class Homescreen extends React.Component {
    static navigationOptions = {
        title: 'Dashboard',
    };

    constructor(props) {
        super(props);
        this.ref = firestore.collection('dashboard').doc("confirmed_cases");
        this.unsubscribe = null;
        this.state = {
            isLoading: true,
            cases: {deaths:"-", infections:"-", recoveries:"-"}
        };
    }

    onCaseUpdate = (snapshot) => {
        const cases = snapshot.data();
        console.log("incoming")
        console.log(snapshot);
        console.log(cases);
        this.setState({
            cases: cases,
            isLoading: false,
        });
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCaseUpdate);
    }
    render(){
        return (
            <View style={styles.homescreen}>
                <Header containerStyle={styles.header} centerComponent={<Text>COVID Tracker</Text>}></Header>
                <RegionSelector/>
                <TopOverviewCards cases={this.state.cases}/>
                <CasesListView cases={this.state.cases}/>
                <SelfReport />
            </View>
        );
    }
    
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