import React from 'react';
import { View, Text } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';


const regionsList = [
    {
        code: "CH", name: "Switzerland"
    },
    {
        code: "DE", name: "Germany"
    }
]

const dummyData = [
    "CZ",
    "DE"
]

const RegionSelector = (props) => {
    return (
        <View>
            <Text>Region Selector</Text>
        </View>
    );
};

export default RegionSelector;