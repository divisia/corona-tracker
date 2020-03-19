import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, FlatList, Image, ScrollView } from 'react-native'
import { ListItem } from "react-native-elements";
import { DatabaseContext } from "../components/DatabaseContext";
import { Linking, WebBrowser } from 'expo';
import Modal, { ModalContent, ModalButton, ModalFooter } from 'react-native-modals'
import i18n from 'i18n-js'


const openUrl = () => {
    const feed_url = this.feed_url;
    if (Linking.canOpenURL(feed_url)){
        Linking.openURL(feed_url);
    } else {
        
    }
}


class Feed extends React.Component {
    render() {
        const { addedAt, thumbnail_url, feed_url, header, origin_url } = this.props.feed;
        return (
            <ListItem
                title={header[i18n.currentLocale().substr(0,2)]}
                subtitle={new Date(addedAt.seconds*1000).toLocaleDateString() + " - " + origin_url}
                leftElement={<Image source={{ uri: thumbnail_url }} style={styles.feedThumbnail}/>}
                onPress={()=>{Linking.openURL(feed_url)}} />
        )
    }
}


class Feeds extends React.Component {
    static navigationOptions = {
        title: 'Newsfeed',
    };

    render() {
        //if (typeof feeds === 'undefined'){ return null; }
        return (
            <DatabaseContext.Consumer>
                {(context) => {
                    const { feeds } = context;
                    if (feeds.data.length <= 0) return (
                        <View style={styles.homescreen}>
                            <Text>We are unable to fetch the newsfeed now.</Text>
                        </View>
                    )
                    return (
                        <View style={styles.feedsContainer}>
                            {feeds.data.map((feed, i) => {
                                return <Feed key={feed.feed_url} feed={feed} />
                            })}
                        </View>);
                }}
            </DatabaseContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    feed: {
        width:"100%"
    },
    feedsContainer:{
        margin:0,
        padding:10,
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
        padding: "20%",
    },
});

export default Feeds;