import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, FlatList, Image, ScrollView } from 'react-native'
import { ListItem } from "react-native-elements";


let DB;


const fetchFeed = () => {
    DB.collection("newsfeed").onSnapshot((collectionSnapshot)=>{
        collectionSnapshot.docs.forEach((doc)=>{
        })
    })
}

class Feeds extends React.Component {
    render(){
        const DB = this.props.DB;
        const [feed, setFeed] = useState([]);

        return (
            <ScrollView>
                <FlatList
                    data={dummyData}
                    keyExtractor={item => item.id}
                    renderItem={({item} )=> (
                        <ListItem
                        title={item.header}
                        titleStyle={styles.feedHeader}
                        containerStyle={styles.feed}
                        leftElement={(<Image style={styles.feedThumbnail} source={{uri:item.thumbnail_url}}/>)}
                        subtitle={item.origin_url}
                        bottomDivider
                        />
                    )}
                />
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    feed: {
        margin:0,
        padding:10,
    },
    feedHeader:{
    },
    feedThumbnail:{
        width:50, 
        height:50,
        marginRight:5,
        margin:0,
        borderRadius:5,
    }
});

export default Feeds;