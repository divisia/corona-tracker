import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import CasesListView from './CasesListView';
import { Header } from "react-native-elements";
import RegionSelector from "./RegionSelector";
import TopOverviewCards from "./TopOverviewCards";
import SelfReport from "./SelfReport";
import firestore from "../../libraries/Firestore";


class Homescreen extends React.Component {
    static navigationOptions = {
        title: 'Dashboardieee',
    };

    constructor(props) {
        super(props);
        this.confirmed_cases_ref = firestore.collection('dashboard').doc("confirmed_cases");
        this.self_reported_ref = firestore.collection('dashboard').doc("self_reported");
        this.cases_unsubscribe = null;
        this.reports_unsubscribe = null;
        this.state = {
            isLoading: true,
            cases: { deaths: "-", infections: "-", recoveries: "-" },
            reports: { negative: {title:"", value:0}, not_tested: {title:"", value:0}, test_pending: {title:"", value:0}, positive: {title:"", value:0} }
        };
    }

    onCaseUpdate = (snapshot) => {
        const cases = snapshot.data();
        this.setState({
            cases: cases,
            isLoading: false,
        });
    }

    onReportUpdate = (snapshot) => {
        const reports = snapshot.data();
        this.setState({
            reports:reports,
            isLoading: false,
        })
        
    }

    componentDidMount() {
        this.cases_unsubscribe = this.confirmed_cases_ref.onSnapshot(this.onCaseUpdate);
        this.reports_unsubscribe = this.self_reported_ref.onSnapshot(this.onReportUpdate);
    }
    render() {
        return (
            <View style={styles.homescreen}>
                <Header containerStyle={styles.header} centerComponent={<Text>COVID Tracker</Text>}></Header>
                <RegionSelector />
                <TopOverviewCards cases={this.state.cases} />
                <CasesListView reports={this.state.reports} />
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
    }
});

export default Homescreen;