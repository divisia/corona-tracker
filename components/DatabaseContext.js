import React, { Component, createContext } from 'react'
import { View, AsyncStorage } from 'react-native';
import firestore from "./Firestore";
import i18n from 'i18n-js';

const NA = "N/A";
export const DatabaseContext = createContext();
export default class DatabaseContextProvider extends Component {

    static callbacks = { newsfeed: null, reported: null, confirmed: null }

    state = {
        lang: i18n.currentLocale(),
        changeLang: (lang) => { this.setState({ lang: lang }) },
        filter: [],
        heatmap: null,
        feeds: {
            loading: true,
            data: []
        },
        reported: {
            loading: true,
            query: "reported/overall",
            data: {
                asympLow: NA,
                asympMedium: NA,
                sympLow: NA,
                sympMedium: NA,
                sympHigh: NA,
            }
        },
        cases: {
            loading: true,
            query: "cases/overall",
            data: {
                dataSources: [],
                subregions: [],
                deaths: NA,
                infections: NA,
                recoveries: NA,
                lastUpdate: NA,
            }
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
        snapshot.forEach((doc) => {
            const data = doc.data();
            // Check if data may cause crash because of unfunfilled fields.
            if (typeof data.feed_url === 'undefined'
                || typeof data.origin_url === 'undefined'
                || typeof data.thumbnail_url === 'undefined'
                || typeof data.header === 'undefined') { /* reserved */ }
            else { feedlist.push({ ...data, id: doc.id }) }

        })
        this.setState({ feeds: { data: feedlist, loading: false } })
    }
    reportedListener = (snapshot) => {
        let reportedData = this.state.reported.data;
        let loading = false;
        if (!snapshot.exists || typeof snapshot === 'undefined') {
            loading = true;
        } else {
            reportedData = snapshot.data();
            // Check if data may cause crash because of unfunfilled fields.
            if (typeof reportedData.sympHigh === 'undefined') reportedData.sympHigh = NA;
            if (typeof reportedData.sympMedium === 'undefined') reportedData.sympMedium = NA;
            if (typeof reportedData.sympLow === 'undefined') reportedData.sympLow = NA;
            if (typeof reportedData.asympMedium === 'undefined') reportedData.asympMedium = NA;
            if (typeof reportedData.asympLow === 'undefined') reportedData.asympLow = NA;
        }
        this.setState({
            reported: {
                ...this.state.reported,
                data: reportedData,
                loading: loading,
            }
        })
    }
    casesListener = (snapshot) => {
        let casesData = this.state.cases.data;
        let loading;
        if (!snapshot.exists || typeof snapshot === 'undefined') {
            loading = true;
        } else {
            casesData = snapshot.data();
            if (typeof casesData.subregions === 'undefined') casesData.subregions = [];
            if (typeof casesData.dataSources === 'undefined') casesData.dataSources = [];
            if (typeof casesData.deaths === 'undefined') casesData.deaths = NA;
            if (typeof casesData.infections === 'undefined') casesData.infections = NA;
            if (typeof casesData.recoveries === 'undefined') casesData.recoveries = NA;
            if (typeof casesData.lastUpdate === 'undefined') casesData.lastUpdate = NA;
            loading = false;
        }
        this.setState({
            cases: {
                ...this.state.cases,
                data: casesData,
                loading: loading,
            }
        })
    }
    heatmapListener = (snapshot) => {
        if (typeof snapshot === 'undefined') {
            return;
        }
        const heatmap = {};
        let points;
        snapshot.forEach((pointArray) => {
            const pointArrayData = pointArray.data();
            if (typeof pointArrayData.points === 'undefined') { points = []; }
            else { points = pointArrayData; }
            heatmap[pointArray.id] = points;
        })
        this.setState({ heatmap: heatmap });
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
        firestore.collection("heatmap").onSnapshot(this.heatmapListener);
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
