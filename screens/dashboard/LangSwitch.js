import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, AsyncStorage, DeviceEventEmitter } from 'react-native';
import i18n from 'i18n-js';
import { DatabaseContext } from '../../components/DatabaseContext';



export default class LangSwitch extends Component {

    state = {

    }

    render() {
        return (
            <DatabaseContext.Consumer>
                {context => {
                    return (
                        <View style={styles.wrapper}>
                            <TouchableOpacity
                                style={styles.langWrapper}
                                onPress={() => {
                                    i18n.locale = "en-US";
                                    AsyncStorage.setItem("language", "en-US");
                                    context.changeLang("en-US")
                                }}
                            >
                                <Text style={styles.lang}>English</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.langWrapper}
                                onPress={() => {
                                    i18n.locale = "de-DE";
                                    AsyncStorage.setItem("language", "de-DE");
                                    context.changeLang("de-DE")
                                }}
                            >
                                <Text style={styles.lang}>Deutsch</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            </DatabaseContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: "row",
        margin: 4,
        padding: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    langWrapper: {
        margin: 10,
        padding: 4,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 2,
    },
    lang: {
        fontSize: 16,
        color: "gray"
    }
})