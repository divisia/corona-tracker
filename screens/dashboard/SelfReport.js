import React, { Component, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import Modal, { ModalContent, ModalButton, ModalFooter, ModalTitle, SlideAnimation } from 'react-native-modals'
import firestore from '../../components/Firestore';
import { RadioButton, Snackbar, Checkbox } from 'react-native-paper';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants, { installationId } from 'expo-constants';
import publicIP from 'react-native-public-ip';
import i18n from 'i18n-js';
import { countryCodes } from "../../utilities/constants";
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from "@expo/vector-icons"
import PickerCheckBox from 'react-native-picker-checkbox';
import { DatabaseContext } from '../../components/DatabaseContext';
const countries = require("i18n-iso-countries");


const infoIcon = (<Ionicons style={{ margin: 2 }} name="md-information-circle-outline" size={16} color={"darkgray"} />)
const locale = i18n.currentLocale().substr(0,2)
const ccodes = Object.keys(countries.getAlpha2Codes()).map((ccode)=>{
    return {
        ccode:ccode,
        key:ccode.toUpperCase(),
        name:countries.getName(ccode, locale),
    };
})


class SelfReport extends Component {
    state = {
        visible: false,
        countryListVisible: false,
        symptomatic: -2,
        testResult: null,
        visitedCountries: [],
        potentialContact: null,
        infoModalText: "...",
        infoModalVisible: false,
        snackVisible: false,
        snackText: ""
    }
    sentFeedback(info) {
        this.setState({ snackVisible: true, snackText: info });
        console.log("REPORT STATUS", info);
    }

    sendReport = (symptomatic, testResult, visitedCountries, potentialContact) => {
        const report = {
            deviceId: Constants.installationId,
            symptomatic: symptomatic,
            createdAt: Date.now(),
            testResult: testResult,
            visitedCountries: visitedCountries,
            potentialContact: potentialContact,
            ipAddress: null,
            location: null,
            locationFine: false,
        }

        publicIP().then((ipAddress) => {
            report.ipAddress = ipAddress;
            console.log("Got IP.", ipAddress)
            Permissions.askAsync(Permissions.LOCATION).then((response) => {
                console.log("ACCESS", response)
                if (response.status !== "granted") { throw Error("Fine location access denied."); }
                Location.getCurrentPositionAsync({}).then((position) => {
                    report.location = position;
                    report.locationFine = true;
                    firestore.collection("reported/overall/cases").add(report);
                    console.log("REPORT SENT", this)
                    this.sentFeedback("Report sent with fine location. Thank you.")
                })
            }).catch((e) => {
                console.log("fallback 2", e)
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
                            console.log("fallback 3", e)
                            firestore.collection("reported/overall/cases").add(report);
                            this.sentFeedback("Report sent with approximate location. Thank you.")
                        })
                            .catch((e) => {
                                console.log("Error", e);
                                report.location = position;
                                firestore.collection("reported/overall/cases").add(report);
                                this.sentFeedback("Report sent without location. Thank you.")
                            })
                    })

            })
        }).catch((e) => {
            this.sentFeedback("Report could not sent. Something went wrong.")
        });

    }

    render() {
        const { infoModalVisible,
            infoModalText,
            visitedCountries,
            potentialContact,
            symptomatic,
            testResult,
            snackVisible } = this.state;
        return(
            <DatabaseContext.Consumer>
                {context=>{
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
            
                                        <View style={{ height: "100%", marginHorizontal: 10 }}>
                                            <Button title="Cancel"
                                                style={{
                                                    margin: 0, padding: 0, flex: 1, width: "100%", height: "100%",
                                                    justifyContent: "center", alignItems: "center"
                                                }}
                                                onPress={() => { this.setState({ visible: false }) }} />
                                        </View>
                                        <View style={{ height: "100%", marginHorizontal: 10 }}>
                                            <Button title="Send"
                                                style={{
                                                    margin: 0, padding: 0, flex: 1, width: "100%", height: "100%",
                                                    justifyContent: "center", alignItems: "center"
                                                }}
                                                onPress={() => { this.sendReport(symptomatic, testResult, visitedCountries, potentialContact); this.setState({ visible: false }) }} />
                                        </View>
            
                                    </ModalFooter>)
                                }
                                modalTitle={<ModalTitle title={i18n.t('reportForm')} />}>
            
                                <ModalContent>
                                    {/* Symptomatic question */}
                                    <View style={styles.modalWrapper}>
                                        <View style={styles.questionSymptomatic}>
                                            <Text>{i18n.t('isHavingSymptoms')}</Text>
                                            <View style={{ flexDirection: "row" }}>
                                                <View style={styles.answer}>
                                                    <View>
                                                        <RadioButton
                                                            value="yes"
                                                            status={this.state.symptomatic === 1 ? 'checked' : 'unchecked'}
                                                            onPress={() => { this.setState({ symptomatic: 1 }) }} />
                                                    </View>
                                                    <Text>{i18n.t('yes')}</Text>
                                                </View>
                                                <View style={styles.answer}>
                                                    <View>
                                                        <RadioButton
                                                            value="no"
                                                            status={this.state.symptomatic === 0 ? 'checked' : 'unchecked'}
                                                            onPress={() => { this.setState({ symptomatic: 0 }) }} />
                                                    </View>
                                                    <Text>{i18n.t('no')}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    {/* Test status question */}
                                    <View style={styles.questionSymptomatic}>
                                        <Text>{i18n.t('whatIsTestResult')}</Text>
                                        <View style={styles.answer}>
            
                                            <View>
                                                <RadioButton
                                                    value="positive"
                                                    status={this.state.testResult === 'positive' ? 'checked' : 'unchecked'}
                                                    onPress={() => { this.setState({ testResult: 'positive' }) }} />
                                            </View>
                                            <Text>{i18n.t('positive')}</Text>
            
                                        </View>
                                        <View style={styles.answer}>
            
                                            <View>
                                                <RadioButton
                                                    value="negative"
                                                    status={this.state.testResult === 'negative' ? 'checked' : 'unchecked'}
                                                    onPress={() => { this.setState({ testResult: 'negative' }) }} />
                                            </View>
                                            <Text>{i18n.t('negative')}</Text>
                                        </View>
                                        <View style={styles.answer}>
            
                                            <View>
                                                <RadioButton
                                                    value="notTested"
                                                    status={this.state.testResult === 'notTested' ? 'checked' : 'unchecked'}
                                                    onPress={() => { this.setState({ testResult: 'notTested' }) }} />
                                            </View>
                                            <Text>{i18n.t('notTested')}</Text>
                                        </View>
                                    </View>
                                    {/* Visited countries question */}
                                    <View style={{ margin: 4 }}>
                                        <Text>{i18n.t('visitedCountriesQuestion')}</Text>
            
                                        <PickerCheckBox
                                            data={ccodes}
                                            headerComponent={<Text style={{ fontSize: 25 }} >{i18n.t('countries')}</Text>}
                                            OnConfirm={(pItems) => this.setState({visitedCountries:pItems})}
                                            ConfirmButtonTitle='OK'
                                            DescriptionField="name"
                                            KeyField='key'
                                            placeholder={i18n.t('visitedCountriesInitialText')}
                                            arrowColor='#FFD740'
                                            arrowSize={10}
                                            placeholderSelectedItems={'$count '+i18n.t('countriesSelected')}
                                        />
            
                                        {/*<TouchableOpacity onPress={() => { this.setState({ countryListVisible: true }) }}>
                                            <View style={{ justifyContent: "center", alignItems: "center", margin: 6, padding: 2, borderColor: "#444", borderWidth: 1, borderRadius: 10 }}>
                                                <Text>{this.state.visitedCountries.length == 0
                                                    ? i18n.t('visitedCountriesInitialText') :
                                                    this.state.visitedCountries.length.toString() + " " + i18n.t('countriesSelected')}
                                                </Text>
                                            </View>
                                                </TouchableOpacity>*/}
            
            
                                    </View>
                                    {/* Contact with infected person question */}
                                    <View style={{ flexWrap: 'wrap' }}>
                                        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center" }}
                                            onPress={() => { this.setState({ infoModalVisible: true, infoModalText: i18n.t('potantialInfectInfo') }); console.log(this.state); }}>
                                            <Text>{i18n.t('didPotantialContact')} {infoIcon}</Text>
                                        </TouchableOpacity>
            
                                        <View style={{ flexDirection: "row" }}>
                                            <TouchableOpacity onPress={() => { this.setState({ potentialContact: "yes" }) }}
                                                style={{ flexDirection: "row", alignItems: "center" }}>
                                                <RadioButton status={potentialContact === 'yes' ? 'checked' : 'unchecked'}
                                                onPress={() => { this.setState({ potentialContact: "yes" }) }} />
                                                <Text>{i18n.t('yes')}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { this.setState({ potentialContact: "no" }) }}
                                                style={{ flexDirection: "row", alignItems: "center" }}>
                                                <RadioButton status={potentialContact === 'no' ? 'checked' : 'unchecked'} 
                                                onPress={() => { this.setState({ potentialContact: "no" }) }}/>
                                                <Text>{i18n.t('no')}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { this.setState({ potentialContact: "dk" }) }}
                                                style={{ flexDirection: "row", alignItems: "center" }}>
                                                <RadioButton status={potentialContact === 'dk' ? 'checked' : 'unchecked'}
                                                onPress={() => { this.setState({ potentialContact: "dk" }) }} />
                                                <Text>{i18n.t('dontKnow')}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </ModalContent>
                            </Modal>
                            <Modal visible={infoModalVisible}
                                onTouchOutside={() => { this.setState({ infoModalVisible: false }) }}>
                                <ModalContent>
                                    <View style={styles.absoluteCenter}>
                                        <Text>{infoModalText}</Text>
                                    </View>
                                </ModalContent>
                            </Modal>
                            <Snackbar
                                visible={snackVisible}
                                onDismiss={() => this.setState({ snackVisible: false })}
                                action={{
                                    label: 'OK',
                                    onPress: () => {
                                        this.setState({ snackVisible: false })
                                    },
                                }}
                            >
                                {this.state.snackText}
                            </Snackbar>
                        </View>
                    );
                }}
            </DatabaseContext.Consumer>
        );
    }
};

const styles = StyleSheet.create({
    selfReportWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: "green",
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 8,
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