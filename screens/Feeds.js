import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, FlatList, Image, ScrollView } from 'react-native'
import { ListItem } from "react-native-elements";
import firestore from "../libraries/Firestore";



class Feeds extends React.Component {
    static navigationOptions = {
        title: 'Newsfeed',
    };

    constructor(props) {
        super(props);
        this.ref = firestore.collection('newsfeed');
        this.unsubscribe = null;
        this.state = {
            isLoading: true,
            feeds: []
        };
    }

    onFeedUpdate = (snapshot) => {
        const feeds = [];
        snapshot.forEach((doc) => {
            feeds.push(doc.data());
        });
        this.setState({
            feeds: feeds,
            isLoading: false,
        });
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onFeedUpdate);
    }

    render() {
        if (this.state.isLoading){
            return (<Text>LOADING</Text>)
        } else {
            return (
                <ScrollView>
                    <FlatList
                        data={this.state.feeds}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <ListItem
                                title={item.header}
                                titleStyle={styles.feedHeader}
                                containerStyle={styles.feed}
                                leftElement={(<Image style={styles.feedThumbnail} source={{ uri: item.thumbnail_url }} />)}
                                subtitle={item.origin_url}
                                bottomDivider
                            />
                        )}
                    />
                </ScrollView>
            );
        }

        
    }
};

const styles = StyleSheet.create({
    feed: {
        margin: 0,
        padding: 10,
    },
    feedHeader: {
    },
    feedThumbnail: {
        width: 50,
        height: 50,
        marginRight: 5,
        margin: 0,
        borderRadius: 5,
    }
});

export default Feeds;