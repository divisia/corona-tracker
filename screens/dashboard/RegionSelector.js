import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import CountryPicker, {  } from "react-native-country-picker-modal";

const countryCode = "CN",
    withFilter = true,
    excludeCountries=[],
    withFlag=true,
    withCurrencyButton = false,
    withCallingCodeButton = false,
    withCountryNameButton = false,
    withAlphaFilter = false,
    withCallingCode = false,
    withCurrency = false,
    withEmoji = false,
    withModal = true,
    withFlagButton = false,
    onSelect=(c)=>{ /* change state or something*/ },
    disableNativeModal=false;




const RegionSelector = (props) => {
    const [visible, setVisible] = useState(false);
    const [countryCode, setCountryCode] = useState("");
    const [country, setCountry] = useState({});

    return (
        <View style={styles.regionSelector}>
                <ScrollView>
                    <CountryPicker
                        {...{
                            countryCode,
                            withFilter,
                            excludeCountries,
                            withFlag,
                            withCurrencyButton,
                            withCallingCodeButton,
                            withCountryNameButton,
                            withAlphaFilter,
                            withCallingCode,
                            withCurrency,
                            withEmoji,
                            withModal,
                            withFlagButton,
                            onSelect,
                            disableNativeModal,
                            modalProps: {
                              visible,
                            },
                            onClose: () => setVisible(false),
                            onOpen: () => setVisible(true),
                    }}
                    translation={"de"}
                    />
                </ScrollView>
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