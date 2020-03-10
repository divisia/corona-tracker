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

    alterFilter = (val) => {
        this.state.filter = val.split(":");
        try { AsyncStorage.setItem("filter", val); } catch { console.log("Filter saving error"); }
    }

    queryGenerator = (type) => {
        return type + this.config.filter.join("/filterable/") + "/overall";
    }

    // Firestore listeners
    feedsListener = (snapshot) => {
        const feedlist = [];
        snapshot.forEach((doc) => feedlist.push({...doc.data(), id:doc.id}))
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
                this.config.filter = value.split(":");
                this.setState({ cases: { ...this.state.cases, query: this.queryGenerator("cases") }, reported: { ...this.state.reported, query: this.queryGenerator("reported") } })
            }
        } catch (error) {
            this.config.filter = [];
        }
    };

    componentDidMount = () => {
        this.config = { filter: [] }
        this.loadSavedFilter();
        firestore.collection("newsfeed").onSnapshot(this.feedsListener);
        firestore.doc(this.state.cases.query).onSnapshot(this.casesListener);
        firestore.doc(this.state.reported.query).onSnapshot(this.reportedListener);
    }

    render() {
        return (
            <DatabaseContext.Provider value={{ ...this.state, alterFilter:this.alterFilter }}>
                {this.props.children}
            </DatabaseContext.Provider>
        )
    }
}
