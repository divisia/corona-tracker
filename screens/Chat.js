import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import { getMediaUri } from '../utilities/constants'
import { ScrollView } from 'react-native-gesture-handler';
import { sentNotifications } from "../notifications/notificationRegisterer";


const Chat = (props) => {
    const { navigation } = (props);
    return (
        <View style={styles.homescreen}>
            <ScrollView>
                {sentNotifications.forEach((no)=>{
                    <View>
                        <Text>{no.title}</Text>
                    </View>
                })}
            </ScrollView>
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