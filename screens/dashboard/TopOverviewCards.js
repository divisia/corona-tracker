import React, { useState, Component } from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import { Card } from 'react-native-elements';
import { DatabaseContext } from '../../components/DatabaseContext';
import i18n from 'i18n-js'


const valueCheck = (value) => {
    return typeof value !== 'undefined' && value ? value : "N/A";
}

const NA = "N/A";


class TopOverviewCards extends Component {
    render() {
        return (
            <DatabaseContext.Consumer>
                {(context) => {
                    const { cases } = context;
                    const loading = cases.loading;
                    return (
                        <View style={styles.overviewCardGroup}>
                            <View style={styles.overviewCard}>
                                <View style={{ flexDirection: "row", alignItems:"center" }}>
                                    <View style={{width:10, height:10, borderRadius:"50", backgroundColor:"black", margin:3}}></View>
                                    <Text>{i18n.t('deaths')}</Text>
                                </View>
                                <Text style={styles.overviewCardValue}>{loading ? NA : cases.data.dead.now}</Text>
                            </View>
                            <View style={styles.overViewCardDivider} />
                            <View style={styles.overviewCard}>
                            <View style={{ flexDirection: "row", alignItems:"center" }}>
                                    <View style={{width:10, height:10, borderRadius:"50", backgroundColor:"red", margin:3}}></View>
                                    <Text>{i18n.t('infections')}</Text>
                                </View>
                            
                                <Text style={styles.overviewCardValue}>{loading ? NA : cases.data.infected.now}</Text>
                            </View>
                            <View style={styles.overViewCardDivider} />
                            <View style={styles.overviewCard}>
                            <View style={{ flexDirection: "row", alignItems:"center" }}>
                                    <View style={{width:10, height:10, borderRadius:"50", backgroundColor:"green", margin:3}}></View>
                                    <Text>{i18n.t('recoveries')}</Text>
                                </View>
                                
                                <Text style={styles.overviewCardValue}>{loading ? NA : cases.data.recovered.now}</Text>
                            </View>
                        </View>
                    );
                }}
            </DatabaseContext.Consumer>
        );
    }
};

const styles = StyleSheet.create({
    overviewCardGroup: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "center",
        borderColor: "transparent",
        borderWidth: 2,
    },
    overviewCard: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        padding: 10,
        justifyContent: "center",
    },
    overViewCardDivider: {
        width: 2,
        alignSelf: "center",
        height: "70%",
        backgroundColor: "lightgray",
    },
    overviewCardValue: {
        marginTop: 5,
        fontWeight: "bold",
    }
});

export default TopOverviewCards;