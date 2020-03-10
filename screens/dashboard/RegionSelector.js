import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, FlatList, ScrollView, TouchableOpacity } from 'react-native'


const RegionSelector = (props) => {


    return (
        <View style={styles.regionSelector}>
                <Text>Select rejyona</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    regionSelector: {
        flex: 1,
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "center",
        right: 0,
        left: 0,
        top: 0,
        zIndex: 1,
    },
    input: {
        margin: 0,
        position: "absolute",
        alignContent: "stretch",

    }
});

export default RegionSelector;