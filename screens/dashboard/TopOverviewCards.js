import React, { useState, Component } from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import { Card } from 'react-native-elements';
import { DatabaseContext } from '../../components/DatabaseContext';
import i18n from 'i18n-js'
import { TouchableOpacity } from 'react-native-gesture-handler';


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
                        <View style={{ justifyContent: "center", flex: 2 }}>
                            <View style={styles.overviewCardGroup}>

                                <View style={styles.overviewCard}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ width: 10, height: 10, borderRadius: 50, backgroundColor: "red", margin: 3 }}></View>
                                        <Text>{i18n.t('casesInfections')}</Text>
                                    </View>

                                    <Text style={styles.overviewCardValue}>{loading ? NA : cases.data.infected.now}</Text>
                                </View>
                                <View style={styles.overViewCardDivider} />
                                <View style={styles.overviewCard}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ width: 10, height: 10, borderRadius: 50, backgroundColor: "green", margin: 3 }}></View>
                                        <Text>{i18n.t('casesRecoveries')}</Text>
                                    </View>

                                    <Text style={styles.overviewCardValue}>{loading ? NA : cases.data.recovered.now}</Text>
                                </View>
                                <View style={styles.overViewCardDivider} />

                                <View style={styles.overviewCard}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ width: 10, height: 10, borderRadius: 50, backgroundColor: "black", margin: 3 }}></View>
                                        <Text>{i18n.t('casesDeaths')}</Text>
                                    </View>
                                    <Text style={styles.overviewCardValue}>{loading ? NA : cases.data.dead.now}</Text>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <View style={{ alignItems: "flex-end", marginHorizontal: 10 }}>
                                    <Text 
                                    style={{ color: "#777" }}>
                                        {i18n.t('dataSource')}: WHO 
                                        - {i18n.t('lastUpdate')}:    
                                         {!cases.data.lastUpdate ? NA : 
                                         new Date(cases.data.lastUpdate.seconds * 1000).toLocaleDateString()+ " "+ new Date(cases.data.lastUpdate.seconds * 1000).toLocaleTimeString()}
                                         </Text>
                                </View>
                            </TouchableOpacity>
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