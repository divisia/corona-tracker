import React, { Component, createContext } from 'react'
import { View, AsyncStorage } from 'react-native';
import firestore from "./Firestore";


export const DatabaseContext = createContext();
export default class DatabaseContextProvider extends Component {

    static callbacks = { newsfeed: null, reported: null, confirmed: null }

    state = {
        filter: [],
        heatmap:null,
        feeds: {
            loading: true,
            data: []
        },
        reported: {
            loading: true,
            query: "reported/overall",
            data: {}
        },
        cases: {
            loading: true,
            query: "cases/overall",
            data: {}
        },
    }

    queryGenerator = (type) => {
        if (this.state.filter.length == 0) { return type + "/overall" }
        return type + "/filterable/" + this.state.filter.join("/filterable/") + "/overall";
    }

    shouldComponentUpdate = () => { return this.shouldUpdate; }

    alterFilter = (val) => {
        this.shouldUpdate = false;
        this.config.unsubscribeCases();
        this.config.unsubscribeReported();
        let filter;
        if (val.length == 0) filter = [];
        else filter = val.split(":");
        this.setState({ filter: filter }, () => {
            this.setState({
                cases: { ...this.state.cases, query: this.queryGenerator("cases") },
                reported: { ...this.state.reported, query: this.queryGenerator("reported") }
            }, () => {
                console.log(this.state.cases.query);
                console.log("Subscribing new listeners")
                this.config.unsubscribeCases = firestore.doc(this.state.cases.query).onSnapshot(this.casesListener);
                this.config.unsubscribeReported = firestore.doc(this.state.reported.query).onSnapshot(this.reportedListener);
                this.shouldUpdate = true;
            })
        });



        try { AsyncStorage.setItem("filter", val); } catch { console.log("Filter saving error"); }
    }
    filterFallback = () => {
        this.state.filter.pop();
        this.state.filter.pop();
        this.state.filter.push("overall");
        this.alterFilter(this.state.filter.join(":"));
    }

    // Firestore listeners
    feedsListener = (snapshot) => {
        const feedlist = [];
        snapshot.forEach((doc) => feedlist.push({ ...doc.data(), id: doc.id }))
        this.setState({ feeds: { data: feedlist, loading: false } })
    }
    reportedListener = (snapshot) => {
        let reportedData = undefined;
        if (!snapshot.exists || typeof snapshot === 'undefined') {
            console.log("Reported data cannot be found for selected filter.")
        } else {
            reportedData = snapshot.data();
        }
        this.setState({
            reported: {
                ...this.state.reported,
                data: reportedData,
                loading: false,
            }
        })
    }
    casesListener = (snapshot) => {
        let casesData = undefined;
        if (!snapshot.exists || typeof snapshot === 'undefined') {
            console.log("Cases data cannot be found for selected filter.")
        } else {
            casesData = snapshot.data();
        }
        this.setState({
            cases: {
                ...this.state.cases,
                data: snapshot.data(),
                loading: false,
            }
        })
    }
    heatmapListener = (snapshot) => {
        if (!snapshot.exists || typeof snapshot === 'undefined'){ return; }
        const heatmapData = snapshot.data();
        this.setState({heatmap:heatmapData});
    }

    loadSavedFilter = async () => {
        try {
            const value = await AsyncStorage.getItem('regionFilter');
            if (value !== null) {
                this.alterFilter(value.split(":"));
            }
        } catch (error) {
        }
    };

    componentDidMount = () => {
        this.shouldUpdate = true;
        this.config = {}
        this.loadSavedFilter();
        firestore.collection("newsfeed").onSnapshot(this.feedsListener);
        firestore.doc("heatmap/overall").onSnapshot(this.heatmapListener);
        this.config.unsubscribeCases = firestore.doc(this.state.cases.query).onSnapshot(this.casesListener);
        this.config.unsubscribeReported = firestore.doc(this.state.reported.query).onSnapshot(this.reportedListener);
    }

    render() {
        return (
            <DatabaseContext.Provider value={{ ...this.state, alterFilter: this.alterFilter }}>
                {this.props.children}
            </DatabaseContext.Provider>
        )
    }
}
