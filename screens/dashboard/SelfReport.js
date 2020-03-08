import React, {useState,useEffect} from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'


const SelfReport = (props) => {
    return (
        <View style={styles.selfReport}>
            <Text>Symptoms?</Text>
            <Button title="Report"/>
        </View>
    );
};

const styles = StyleSheet.create({
    selfReport: {
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center",
        borderColor:"green",
        borderWidth:1,
        paddingHorizontal:20,
        paddingVertical:10,
    }
});

export default SelfReport;