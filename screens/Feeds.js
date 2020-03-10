import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, FlatList, Image, ScrollView } from 'react-native'
import { ListItem } from "react-native-elements";
import {DatabaseContext} from "../components/DatabaseContext";


class Feed extends React.Component {
    render(){
        const { thumbnail_url, feed_url, header, origin_url } = props;
        return (
            <ListItem
            subtitle={origin_url}
            title={header}
            leftElement={(<Image source={{uri:thumbnail_url}} style={styles.feedThumbnail}/>)}
            />
        );
    }
}


class Feeds extends React.Component {
    static navigationOptions = {
        title: 'Newsfeed',
    };

    render() {
        const { feeds } = this.props;
        return (
            <View>
                <ScrollView>
                    {feeds.map((feed)=>{
                        <Feed feed={feed}/>
                    })}
                </ScrollView>
            </View>
        );
    }
}

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
    },
    homescreen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20%",
    },
});

export default Feeds;