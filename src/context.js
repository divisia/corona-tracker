import React, { createContext } from 'react'
import firestore from '../libraries/Firestore';

export const DatabaseContext = createContext({});
export class DatabaseContextProvider extends React.Component {
    constructor(props){
        super(props);
        this.unsubscribe = null;
        this.state = {
            isLoading: true,
            feeds: [],
            reported: null,
            confirmed: null,
            ref_newsfeed: firestore.collection('newsfeed').doc('overall'),
            //ref_reported = firestore.collection('reported').doc('overall'),
            //ref_confirmed = firestore.collection('confirmed').doc('overall'),
        };
        
    }

    onFeedUpdate = (snapshot) => {}
    onReportedUpdate = (snapshot) => {}
    onConfirmedUpdate = (snapshot) => {}

    attachListener = () => {
        this.unscribe = this.state.ref_newsfeed.onSnapshot(this.onFeedUpdate);
    }

    render(){
        return (
            <DatabaseContext.Provider value={{...this.state}}>
                {this.props.children}
            </DatabaseContext.Provider>
        );
    }
}