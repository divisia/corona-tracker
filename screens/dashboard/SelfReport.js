import React, { Component, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import Modal, { ModalContent, ModalButton, ModalFooter, ModalTitle, SlideAnimation } from 'react-native-modals'
import firestore from '../../components/Firestore';
import { RadioButton } from 'react-native-paper';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants, { installationId } from 'expo-constants';
import publicIP from 'react-native-public-ip';


const getLocation = async (ipv4) => {

    const getGeoIp = async () => {
        const position = { longitude: 0, latitude: 0 }
        await fetch(`api.ipstack.com/${ipv4}?access_key=9de8d32f0e86a88be160ed408a7c84b5`)
            .then(json => {
                position = {
                    state: json.region_name,
                    city: json.city,
                    country: json.country_code,
                    latitude: json.latitude,
                    longitude: json.longitude
                };
                return [position, false]
            }).catch(() => {
                fetch(`https://freegeoip.app/json/`)
                    .then(json => {
                        position = {
                            state: json.region_name,
                            city: json.city,
                            country: json_country_code,
                            latitude: json.latitude,
                            longitude: json.longitude
                        }; return [position, false]
                    }).catch(() => {
                        return [position, false];
                    })
            })

    }

    Permissions.askAsync(Permissions.LOCATION).then((status) => {
        // User permitted to get fine location. That's good.
        if (status === 'granted') {
            Location.getCurrentPositionAsync({}).then((position) => {
                console.log(position);
                return [position, true];
            }).catch(() => {
                return getGeoIp();
            })
        }

        // User denied. We need to get approx IP based location.
        else {
            return getGeoIp();
        }
    });
}


const prepareReport = (symptomatic, testResult) => {
    const report = {
        deviceId: Constants.installationId,
        symptomatic: symptomatic,
        createdAt: Date.now(),
        testResult: testResult,
        ipAddress: null,
        location: null,
        locationFine: null,
    }
    const callback = () => {
        if (
            report.ipAddress &&
            report.location && 
            report.locationFine
        ) {
            return true;
        } else { return false; }
    }

    publicIP().then((ipAddress) => { report.ipv4 = ipAddress });
    Location.getCurrentPositionAsync({}).then((position)=>{ report.location = position; report.locationFine = true; })

}


const sendReport = (symptomatic, testResult) => {
    let success = false;
    let ipv4 = null;
    publicIP().then((ipAddress) => {
        console.log(ipAddress);
        let [location, fine] = getLocation(ipAddress);

        const report = {
            deviceId: Constants.installationId,
            symptomatic: symptomatic,
            createdAt: Date.now(),
            testResult: testResult,
            ipAddress: ipAddress,
            location: location,
            locationFine: fine,
        }
        console.log(report);

        // Put data to suitable collection
        firestore.collection("reported/overall/cases").add(report)
            .then((docRef) => { success = true; })
            .catch(() => { success = false; })

        return success;
    })
}


class SelfReport extends Component {
    state = {
        visible: true,
        symptomatic: -1,
        testResult: null,
    }
    render() {
        return (
            <View style={styles.selfReportWrapper}>
                <Text>Would you like to help us tracing COVID-19?</Text>
                <Button title="Sure" onPress={() => { this.setState({ visible: true }) }} />

                <Modal
                    visible={this.state.visible}
                    onTouchOutside={() => { this.setState({ visible: false }) }}
                    modalAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                    footer={
                        (<ModalFooter>
                            <ModalButton
                                text="Cancel"
                                onPress={() => { this.setState({ visible: false }) }}
                            />
                            <ModalButton
                                text="Send"
                                onPress={() => {
                                    sendReport(this.state.symptomatic, this.state.testResult);
                                }}
                            />
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
});

export default SelfReport;