import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import { getMediaUri } from '../utilities/constants'


const Chat = (props) => {
    const { navigation } = (props);
    return (
        <View style={styles.homescreen}>
            <Image
                style={{ width: 210, height: 250}}
                source={{ uri: getMediaUri("under_construction.png") }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    homescreen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default Chat;