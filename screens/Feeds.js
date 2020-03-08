import React, {useState,useEffect} from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import firestore from '@react-native-firebase/firestore';


const Feeds = (props) => {
    const { navigation } = (props);
    const refdb = firestore().collection("newsfeed");
    const [feed, setFeed] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        return refdb.onSnapshot((querySnapshot)=>{
            const list = [];
            querySnapshot.forEach((item)=>{
                const {feed_url, thumbnail_url, origin_url} = item.data();
                list.push({
                    ...item.data(),
                    key:item.id
                });
            });
            setFeed(list);
            if (loading) setLoading(false);
        }, [])
    })
    if (loading) return null;
    return (
        <FlatList
        data={feed}
        renderItem={(item)=>{
            <Text>{item.feed_url}</Text>
        }}
        />
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