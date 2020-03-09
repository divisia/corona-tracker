import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import { Card } from 'react-native-elements';

const TopOverviewCards = (props) => {
    const { deaths, infections, recoveries } = props.cases;
    return (
        <View style={styles.overviewCardGroup}>
            <View style={styles.overviewCard}>
                <Text>{deaths.title}</Text>
                <Text style={styles.overviewCardValue}>{deaths.value}</Text>
            </View>
            <View style={styles.overviewCard}>
                <Text>{infections.title}</Text>
                <Text style={styles.overviewCardValue}>{infections.value}</Text>
            </View>
            <View style={styles.overviewCard}>
                <Text>{recoveries.title}</Text>
                <Text style={styles.overviewCardValue}>{recoveries.value}</Text>
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
        textAlign:"center",
        justifyContent:"center",
    },
    overviewCardValue:{
        marginTop:5,
        fontWeight:"bold",
    }
});

export default TopOverviewCards;