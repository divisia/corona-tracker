import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import { Card } from 'react-native-elements';

const TopOverviewCards = (props) => {
    return (
        <View style={styles.overviewCardGroup}>
            <View style={styles.overviewCard}>
                <Text>c</Text>
                <Text style={styles.overviewCardValue}></Text>
            </View>
            <View style={styles.overviewCard}>
                <Text>i</Text>
                <Text style={styles.overviewCardValue}></Text>
            </View>
            <View style={styles.overviewCard}>
                <Text>r</Text>
                <Text style={styles.overviewCardValue}></Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overviewCardGroup: {
        flex:2,
        flexDirection: "row",
        justifyContent:"center",
    }, 
    overviewCard:{
        backgroundColor:"lightgray",
        flex:1,
        padding:10,
        justifyContent:"center",
    },
    overviewCardValue:{
        marginTop:5,
        fontWeight:"bold",
    }
});

export default TopOverviewCards;