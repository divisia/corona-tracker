import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import { Card } from 'react-native-elements';

const dummyData = [
    {
        title: "Confirmed Deaths",
        value: "192"
    },
    {
        title: "Confirmed Infections",
        value: "1435"
    },
    {
        title: "Confirmed Recoveries",
        value: "781"
    }
]

const TopOverviewCards = (props) => {
    const { deaths, infections, recoveries } = props.cases;
    return (
        <View style={styles.overviewCardGroup}>
            <View style={styles.overviewCard}>
                <Text>WHO Confirmed Deaths</Text>
                <Text style={styles.overviewCardValue}>{deaths}</Text>
            </View>
            <View style={styles.overviewCard}>
                <Text>WHO Confirmed Infections</Text>
                <Text style={styles.overviewCardValue}>{infections}</Text>
            </View>
            <View style={styles.overviewCard}>
                <Text>WHO Confirmed Recoveries</Text>
                <Text style={styles.overviewCardValue}>{recoveries}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overviewCardGroup: {
        flex:1,
        flexDirection: "row",
        justifyContent:"center",
    }, 
    overviewCard:{
        backgroundColor:"lightgray",
        flex:1,
        padding:10,
        textAlign:"center",
        justifyContent:"center",
    },
    overviewCardValue:{
        marginTop:10,
        fontWeight:"bold",
    }
});

export default TopOverviewCards;