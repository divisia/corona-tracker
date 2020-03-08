import React, {useState,useEffect} from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input';


const RegionSelector = (props) => {
    return (
        <View style={styles.regionSelector}>
            <Text>Region:</Text>
            <Autocomplete/>
        </View>
    );
};

const styles = StyleSheet.create({
    regionSelector: {
        flex: 1,
        flexDirection:"row",
    }
});

export default RegionSelector;