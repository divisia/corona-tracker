import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'


const Map = (props) => {
    return (
        <View style={styles.homescreen}>
            <Text>Map goes here</Text>
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

export default Map;