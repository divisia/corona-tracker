import React, {useState,useEffect} from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'


const Feeds = (props) => {
    const { navigation } = (props);
    return (
        <View><Text>News Feed</Text></View>
    );
};

const styles = StyleSheet.create({
    homescreen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default Feeds;