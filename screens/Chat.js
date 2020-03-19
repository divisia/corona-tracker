import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import { getMediaUri } from '../utilities/constants'
import { ScrollView } from 'react-native-gesture-handler';
import { notifications, loading } from "../notifications/notificationRegisterer";


const Chat = (props) => {
    const { navigation } = (props);
    return (
        <View style={styles.homescreen}>
            <ScrollView>
                {
                loading?(<Text>LOADING</Text>):
                notifications.map((notification) => {
                    return (
                        <View 
                        key={notification.title}
                        style={{
                            borderWidth: 1,
                            borderColor: "black",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            padding:4,
                            margin:10,
                        }}>

                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>{notification.title}</Text>
                            <Text>{notification.body}</Text>

                        </View>
                    );
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