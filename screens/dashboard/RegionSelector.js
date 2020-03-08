import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input';
import { acc } from 'react-native-reanimated';


const dummyData = [
    "CN",
    "DE",
    "TR",
    "US",
    "FR",
]

const dummyData2 = [
    {
        code:"CN",
        name:"Switzerland"
    },{
        code:"DE",
        name:"German"
    },{
        code:"FR",
        name:"France"
    }
]

const RegionSelector = (props) => {
    const [query, setQuery] = useState({countries:[], query:""});

    return (
        <View style={styles.regionSelector}>
            <View style={styles.input}>
                <Autocomplete
                    autoCapitalize="words"
                    autoCorrect={true}
                    data={dummyData2}
                    placeholder="Select region"
                    onChangeText={text => setQuery({ query: text })}
                    renderItem={({name})=>(
                        <TouchableOpacity onPress={() => setQuery({ query: name })}>
                            <Text>{name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    regionSelector: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        right:0,
        left:0,
        top:0,
        zIndex:1,
    },
    input: {
        margin:0,
        position:"absolute",
        alignContent:"stretch",
        
    }
});

export default RegionSelector;