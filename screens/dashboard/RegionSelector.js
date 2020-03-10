import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Button } from 'react-native'
import { DatabaseContext } from '../../components/DatabaseContext';


const RegionSelector = (props) => {
    const [val, setVal] = useState("");

    return (
        <DatabaseContext.Consumer>
            {(context) => {
                const { alterFilter } = context;
                return (
                    <View style={styles.regionSelector}>
                        <TextInput onChangeText={setVal} value={val} placeholder="Enter region" />
                        <Button title="confirm" onPress={() => { alterFilter(val) }} />
                    </View>
                );
            }}
        </DatabaseContext.Consumer>
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