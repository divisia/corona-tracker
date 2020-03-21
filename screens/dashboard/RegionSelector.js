import React, { Component, useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Modal, { ModalButton, BottomModal, SlideAnimation } from 'react-native-modals';
import { ListItem } from 'react-native-elements';
import { DatabaseContext } from '../../components/DatabaseContext';
import ModalContent from 'react-native-modals/dist/components/ModalContent';
import { List } from 'react-native-paper';
import i18n from 'i18n-js';
const countries = require("i18n-iso-countries");


const NA = "N/A"

class RegionSelector extends Component {

    state = {
        visible: false,
        subregions: [],
    }

    render() {
        return (
            <DatabaseContext.Consumer>
                {(context) => {

                    this.state.subregions = context.cases.data.subregions;
                    const { alterFilter } = context;
                    return (
                        <View style={styles.regionSelectorWrapper}>

                            <TouchableOpacity onPress={() => { this.setState({ visible: true }) }}>
                                <View style={styles.button}><Text>{i18n.t('region')}: {context.cases.loading || context.filter.length == 0 ? NA : countries.getName(context.filter[0], i18n.currentLocale().substr(0,2)) +", "+ context.filter.slice(1).join(", ")}</Text></View>
                            </TouchableOpacity>


                            <BottomModal
                                visible={this.state.visible}
                                onTouchOutside={() => { this.setState({ visible: false }) }}
                                modalAnimation={new SlideAnimation({
                                    slideFrom: 'bottom',
                                })}>
                                <ModalContent>
                                    {
                                        context.filter.length>=1?<ListItem
                                        key={"goBack"}
                                        containerStyle={styles.subregionContainer}
                                        title={i18n.t('goBack')}
                                        onPress={() => {
                                            console.log("NEW FILTER:",context.filter.slice(0,-1).join(":"));
                                            context.alterFilter(context.filter.slice(0,-1).join(":"))
                                        }}/>:null
                                    }

                                    {context.cases.loading ? null :
                                        context.cases.data.subregions.map((region) => {
                                            return (
                                                <ListItem
                                                    key={Math.random().toString()}
                                                    containerStyle={styles.subregionContainer}
                                                    title={context.cases.data.top?countries.getName(region, i18n.currentLocale().substr(0,2)):region}
                                                    onPress={() => {
                                                        context.alterFilter(context.filter.length == 0 ? region : context.filter.join(":") + ":" + region)
                                                    }}
                                                />

                                            );
                                        })
                                    }
                                </ModalContent>
                            </BottomModal>
                        </View>
                    );
                }}
            </DatabaseContext.Consumer>
        );
    }
};

const styles = StyleSheet.create({
    regionSelectorWrapper: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        margin: 0,
        width: "100%"
    },
    input: {
        marginRight: 30,
        marginLeft: 20,
        padding: 5,
        alignContent: "center",
        borderColor: "transparent",
        borderBottomColor: "lightgray",
        borderWidth: 1,
        width: "50%"
    },
    button: {
        borderColor: "purple",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderWidth: 1,
        padding: 8,
        marginHorizontal: 10,
        marginVertical: 4,
        alignItems: "center",
        justifyContent: "center"
    },
    subregionContainer: {
        padding: 4,
        margin: 2,
    }
});

export default RegionSelector;