import React, { Component, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, FlatList, Dimensions } from 'react-native'
import { Checkbox } from 'react-native-paper'
import Modal, { ModalContent, ModalButton, ModalFooter, ModalTitle, SlideAnimation } from 'react-native-modals'
import firestore from '../../components/Firestore';
import { RadioButton } from 'react-native-paper';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants, { installationId } from 'expo-constants';
import publicIP from 'react-native-public-ip';
import i18n from 'i18n-js';
import { countryCodes } from "../../utilities/constants";
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from "@expo/vector-icons"
const countries = require("i18n-iso-countries");


const infoIcon = (<Ionicons name="md-information-circle-outline" size={16} color={"darkgray"} />)


const sendReport = (symptomatic, testResult) => {
    const report = {
        deviceId: Constants.installationId,
        symptomatic: symptomatic,
        createdAt: Date.now(),
        testResult: testResult,
        ipAddress: null,
        location: null,
        locationFine: false,
    }

    publicIP().then((ipAddress) => {
        report.ipAddress = ipAddress;
        console.log("Got IP.", ipAddress)
        Location.getCurrentPositionAsync({}).then((position) => {
            console.log("Got location.", position)
            report.location = position;
            report.locationFine = true;
            console.log("Report ready.", report)
            firestore.collection("reported/overall/cases").add(report);
        }).catch((e) => {
            let position = { longitude: 0, latitude: 0 }
            fetch(`https://freegeoip.app/json/`)
                .then(response => {
                    response.json().then((json) => {
                        position = {
                            state: json.region_name,
                            city: json.city,
                            country: json.country_code,
                            latitude: json.latitude,
                            longitude: json.longitude
                        };
                        report.location = position;
                        firestore.collection("reported/overall/cases").add(report);
                    })
                        .catch((e) => {
                            console.log("Error", e);
                            report.location = position;
                            firestore.collection("reported/overall/cases").add(report);
                        })
                })

        })
    });

}

class SelfReport extends Component {
    state = {
        visible: false,
        countryListVisible: false,
        symptomatic: 0,
        testResult: "notTested",
        visitedCountries: [],
    }
    render() {
        const { visitedCountries } = this.state;
        return (
            <View style={styles.selfReportWrapper}>
                <Text>{i18n.t('selfReportOffer')}</Text>
                <View style={styles.button}>
                    <Button title={i18n.t('selfReportButton')} onPress={() => { this.setState({ visible: true }) }} />
                </View>

                {/* Report form */}
                <Modal
                    style={{ width: "100%" }}
                    visible={this.state.visible}
                    onTouchOutside={() => { this.setState({ visible: false }) }}
                    modalAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                    footer={
                        (<ModalFooter
                            style={{ margin: 0, padding: 0, flexDirection: "row", height: 40, alignItems: "center", justifyContent: "center" }}>

                            <Button title="Option"
                                style={{
                                    margin: 0, padding: 0, flex: 1, width: "100%", height: "100%",
                                    justifyContent: "center", alignItems: "center"
                                }} />

                        </ModalFooter>)
                    }
                    modalTitle={<ModalTitle title="Report form" />}>

                    <ModalContent>
                        {/* Symptomatic question */}
                        <View style={styles.modalWrapper}>
                            <View style={styles.questionSymptomatic}>
                                <Text>Are you having symptoms?</Text>
                                <View style={styles.answer}>

                                    <View>
                                        <RadioButton
                                            value="yes"
                                            status={this.state.symptomatic === 1 ? 'checked' : 'unchecked'}
                                            onPress={() => { this.setState({ symptomatic: 1 }) }} />
                                    </View>
                                    <Text>Yes</Text>

                                </View>
                                <View style={styles.answer}>
                                    <View>
                                        <RadioButton
                                            value="no"
                                            status={this.state.symptomatic === 0 ? 'checked' : 'unchecked'}
                                            onPress={() => { this.setState({ symptomatic: 0 }) }} />
                                    </View>
                                    <Text>No</Text>
                                </View>
                            </View>
                        </View>
                        {/* Test status question */}
                        <View style={styles.questionSymptomatic}>
                            <Text>What is your test result?</Text>
                            <View style={styles.answer}>

                                <View>
                                    <RadioButton
                                        value="positive"
                                        status={this.state.testResult === 'positive' ? 'checked' : 'unchecked'}
                                        onPress={() => { this.setState({ testResult: 'positive' }) }} />
                                </View>
                                <Text>Positive</Text>

                            </View>
                            <View style={styles.answer}>

                                <View>
                                    <RadioButton
                                        value="negative"
                                        status={this.state.testResult === 'negative' ? 'checked' : 'unchecked'}
                                        onPress={() => { this.setState({ testResult: 'negative' }) }} />
                                </View>
                                <Text>Negative</Text>
                            </View>
                            <View style={styles.answer}>

                                <View>
                                    <RadioButton
                                        value="notTested"
                                        status={this.state.testResult === 'notTested' ? 'checked' : 'unchecked'}
                                        onPress={() => { this.setState({ testResult: 'notTested' }) }} />
                                </View>
                                <Text>Not tested</Text>
                            </View>
                        </View>
                        {/* Visited countries question */}
                        <View style={{ margin: 4 }}>
                            <Text>{i18n.t('visitedCountriesQuestion')}</Text>
                            <TouchableOpacity onPress={() => { this.setState({ countryListVisible: true }) }}>
                                <View style={{ justifyContent: "center", alignItems: "center", margin: 6, padding: 2, borderColor: "#444", borderWidth: 1 }}>
                                    <Text>{this.state.visitedCountries.length == 0
                                        ? i18n.t('visitedCountriesInitialText') :
                                        this.state.visitedCountries.length.toString() + " " + i18n.t('countriesSelected')}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {/* Contact with infected person question */}
                        <View>
                            <TouchableOpacity style={{ flexDirection: "row" }}
                                onPress={() => { }}>
                                <Text>Did you have contact with a potantial coronavirus infected person?</Text>
                                {infoIcon}

                            </TouchableOpacity>
                            <View>
                                <View>
                                    <RadioButton />
                                    <Text>Yes</Text>
                                </View>
                                <View>
                                    <RadioButton />
                                    <Text>No</Text>
                                </View>
                                <View>
                                    <RadioButton />
                                    <Text>I don't know</Text>
                                </View>
                            </View>
                        </View>
                    </ModalContent>
                </Modal>
                <Modal
                    visible={this.state.countryListVisible}
                    onTouchOutside={() => { this.setState({ countryListVisible: false }) }}
                    footer={(<ModalFooter>
                        <Button title="OK"></Button>
                    </ModalFooter>)}
                >
                    <ModalContent>
                        <View >
                            <ScrollView style={{
                                height: Dimensions.get("window").height * 8 / 10,
                                width: 200
                            }}>
                                {countryCodes.map((ccode) => {
                                    return (
                                        <TouchableOpacity
                                            style={{ flexDirection: "row", margin: 2 }}
                                            onPress={() => {
                                                if (!visitedCountries.includes(ccode)) {
                                                    this.setState({ visitedCountries: [...this.state.visitedCountries, ccode.toLowerCase()] })
                                                } else {
                                                    const vc = visitedCountries;
                                                    vc.splice(vc.indexOf(ccode), 1)
                                                    this.setState({ visitedCountries: vc })
                                                }
                                            }}
                                            key={ccode}
                                        >
                                            <Checkbox
                                                status={this.state.visitedCountries.includes(ccode.toLowerCase()) ? "checked" : "unchecked"}
                                                onPress={() => { }}
                                            />
                                            <Text>{countries.getName(ccode, "en")}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </ScrollView>
                        </View>
                    </ModalContent>
                </Modal>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    selfReportWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: "green",
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    answer: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    questionSymptomatic: {
        marginTop: 10,
        alignItems: "flex-start",
    },
    modalWrapper: {
        width: "100%",
    },
    button: {
        marginHorizontal: 5,
    }
});

export default SelfReport;