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
                        <TextInput style={styles.input} onChangeText={setVal} value={val} placeholder="Enter region" />
                        <Button style={styles.button} title="confirm" onPress={() => { alterFilter(val) }} />
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
        alignItems: "center",
        justifyContent: "center",
        padding:0,
        margin:0,
        width:"100%"
    },
    input: {
        marginRight:30,
        marginLeft:20,
        padding:5,
        alignContent: "center",
        borderColor:"transparent",
        borderBottomColor:"lightgray",
        borderWidth:1,
        width:"50%"
    },
    button:{
        left:0,
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"flex-end"
    }
});

export default RegionSelector;