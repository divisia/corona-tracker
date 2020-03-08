import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'


const Homescreen = (props) => {
    let { navigation } = (props);
    navigation.setOptions({title:"MOD"})
    return (
        <View style={styles.homescreen}>
            <Text>Homescreen</Text>
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

export default Homescreen;