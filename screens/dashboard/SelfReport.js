import React, { Component, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import Modal, { ModalContent, ModalButton, ModalFooter, ModalTitle, SlideAnimation } from 'react-native-modals'
import firestore from '../../components/Firestore';
import { RadioButton } from 'react-native-paper';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants, { installationId } from 'expo-constants';
import publicIP from 'react-native-public-ip';


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
        symptomatic: 0,
        testResult: "notTested",
    }
    render() {
        return (
            <View style={styles.selfReportWrapper}>
                <Text>Would you like to help us tracing COVID-19?</Text>
                <View style={styles.button}>
                <Button title="Sure" onPress={() => { this.setState({ visible: true }) }} />
                </View>
                

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
                                    this.setState({visible: false})
                                    // TODO show feedback
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
    button:{
        marginHorizontal:5,
    }
});

export default SelfReport;