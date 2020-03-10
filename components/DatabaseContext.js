import React, { Component, createContext } from 'react'
import { View } from 'react-native';
import firestore from "./Firestore";


export const DatabaseContext = createContext();
export default class DatabaseContextProvider extends Component {
    state = {
        feeds:{
            listenPath:"newsfeed",
            ref:firestore.collection("newsfeed"),
            listener:null,
            callback:null,
            data:[]
        }
    }

    componentDidMount = () => {
        this.state.feeds.callback = (feed) => { feed.forEach((doc)=>{this.state.feeds.data.push(doc.data())}) }
        this.state.feeds.unsubscribe = firestore.collection("newsfeed").onSnapshot(this.state.feeds.callback);
    }
    
    render() {
        return (
            <DatabaseContext.Provider value={{...this.state}}>
                {this.props.children}
            </DatabaseContext.Provider>
        )
    }
}
