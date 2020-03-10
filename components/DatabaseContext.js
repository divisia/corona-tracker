import React, { Component, createContext } from 'react'
import { View, AsyncStorage } from 'react-native';
import firestore from "./Firestore";


export const DatabaseContext = createContext();
export default class DatabaseContextProvider extends Component {

    static callbacks = { newsfeed: null, reported: null, confirmed: null }

    state = {
        filter: [],
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
        return type + "/" + this.state.filter.join("/filterable/") + "/overall";
    }
    updateQueries = () => {
        this.setState({})
    }

    alterFilter = (val) => {
        this.config.unsubscribeCases();
        this.config.unsubscribeReported();

        this.state.filter = val.split(":");
        this.setState({
            cases: { ...this.state.cases, query: this.queryGenerator("cases") },
            reported: { ...this.state.reported, query: this.queryGenerator("reported") }
        })
        
        try { AsyncStorage.setItem("filter", val); } catch { console.log("Filter saving error"); }
    }

    // Firestore listeners
    feedsListener = (snapshot) => {
        const feedlist = [];
        snapshot.forEach((doc) => feedlist.push({ ...doc.data(), id: doc.id }))
        this.setState({ feeds: { data: feedlist, loading: false } })
    }
    reportedListener = (snapshot) => {
        this.setState({
            reported: {
                ...this.state.reported,
                data: snapshot.data(),
                loading: false,
            }
        })
    }
    casesListener = (snapshot) => {
        this.setState({
            cases: {
                ...this.state.cases,
                data: snapshot.data(),
                loading: false,
            }
        })
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
        this.config = {}
        this.loadSavedFilter();
        firestore.collection("newsfeed").onSnapshot(this.feedsListener);
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
