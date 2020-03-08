import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'


const Chat = (props) => {
    const { navigation } = (props);
    return (
        <View style={styles.homescreen}>
            <Text>Chat</Text>
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