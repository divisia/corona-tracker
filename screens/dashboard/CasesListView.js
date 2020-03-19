import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Divider, ListItem, Header, Badge } from 'react-native-elements'
import { DatabaseContext } from "../../components/DatabaseContext";
import { Ionicons } from '@expo/vector-icons'
import i18n from 'i18n-js';
import Modal, { ModalContent } from 'react-native-modals';
import { TouchableOpacity } from 'react-native-gesture-handler';


const NA = "N/A";
const infoIcon = (<Ionicons name="md-information-circle-outline" size={16} color={"darkgray"} />)


class CasesListView extends React.Component {

    state = {
        infoVisible: false,
        infoText: "The unexpecthed has been happening. Report this to the author."
    }

    render() {
        return (
            <DatabaseContext.Consumer>
                {(context) => {
                    const { reported } = context;
                    const loading = reported.loading;
                    return (
                        <View style={styles.cases}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        infoVisible: true,
                                        infoText: i18n.t('selfReportInfo')
                                    })
                                }}
                                style={{ flexDirection: "row", padding: 3, marginLeft: 2 }}>
                                <Text style={{ color: "#777" }}>{i18n.t('selfReport')}</Text>
                                {infoIcon}

                            </TouchableOpacity>
                            <ListItem
                                onPress={() => {
                                    this.setState({
                                        infoVisible: true,
                                        infoText: i18n.t('sympHighInfo')
                                    })
                                }}
                                leftElementStyle={styles.caseTitle}
                                rightElement={(<Text>{reported.data.sympHigh.now}</Text>)}
                                leftElement={
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ margin: 4, backgroundColor: "brown", width: 12, height: 12, borderRadius:50 }} />
                                        <Text>{i18n.t('sympHigh')}</Text>
                                        {infoIcon}
                                    </View>}
                                containerStyle={styles.caseItems}
                                bottomDivider
                                key={Math.random().toString()}
                                contentContainerStyle={{ paddingHorizontal: 10 }}
                            />
                            <ListItem
                                onPress={() => {
                                    this.setState({
                                        infoVisible: true,
                                        infoText: i18n.t('sympMediumInfo')
                                    })
                                }}
                                leftElementStyle={styles.caseTitle}
                                rightElement={(<Text>{reported.data.sympMedium.now}</Text>)}
                                leftElement={
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ margin: 4, backgroundColor: "cyan", width: 12, height: 12, borderRadius:50 }} />
                                        <Text>{i18n.t('sympMedium')}</Text>
                                        {infoIcon}
                                    </View>}
                                containerStyle={styles.caseItems}
                                bottomDivider
                                key={Math.random().toString()}
                                contentContainerStyle={{ paddingHorizontal: 10 }}
                            />
                            <ListItem
                                onPress={() => {
                                    this.setState({
                                        infoVisible: true,
                                        infoText: i18n.t('sympLowInfo')
                                    })
                                }}
                                leftElementStyle={styles.caseTitle}
                                rightElement={(<Text>{reported.data.sympLow.now}</Text>)}
                                leftElement={
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ margin: 4, backgroundColor: "purple", width: 12, height: 12, borderRadius:50 }} />
                                        <Text>{i18n.t('sympLow')}</Text>
                                        {infoIcon}
                                    </View>}
                                containerStyle={styles.caseItems}
                                bottomDivider
                                key={Math.random().toString()}
                                contentContainerStyle={{ paddingHorizontal: 10 }}
                            />
                            <ListItem
                                onPress={() => {
                                    this.setState({
                                        infoVisible: true,
                                        infoText: i18n.t('asympMediumInfo')
                                    })
                                }}
                                leftElementStyle={styles.caseTitle}
                                rightElement={(<Text>{reported.data.asympMedium.now}</Text>)}
                                leftElement={
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ margin: 4, backgroundColor: "gold", width: 12, height: 12, borderRadius:50 }} />
                                        <Text>{i18n.t('asympMedium')}</Text>
                                        {infoIcon}
                                    </View>}
                                containerStyle={styles.caseItems}
                                bottomDivider
                                key={Math.random().toString()}
                                contentContainerStyle={{ paddingHorizontal: 10 }}
                            />
                            <ListItem
                                onPress={() => {
                                    this.setState({
                                        infoVisible: true,
                                        infoText: i18n.t('asympLowInfo')
                                    })
                                }}
                                leftElementStyle={styles.caseTitle}
                                rightElement={(<Text>{reported.data.asympLow.now}</Text>)}
                                leftElement={
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ margin: 4, backgroundColor: "blue", width: 12, height: 12, borderRadius:50 }} />
                                        <Text>{i18n.t('asympLow')}</Text>
                                        {infoIcon}
                                    </View>}
                                containerStyle={styles.caseItems}
                                bottomDivider
                                key={Math.random().toString()}
                                contentContainerStyle={{ paddingHorizontal: 10 }}
                            />
                            <Modal
                                visible={this.state.infoVisible}
                                onTouchOutside={() => { this.setState({ infoVisible: false }) }}
                            >
                                <ModalContent>
                                    <Text>{this.state.infoText}</Text>
                                </ModalContent>
                            </Modal>
                        </View>
                    );
                }}
            </DatabaseContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    cases: {
        width: "100%",
        flex: 3.8,
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: 8,
    },
    caseItems: {
        borderWidth:1,
        margin: 1,
        padding: 4,
        backgroundColor: "transparent",
        borderColor: "darkgray",
        borderBottomWidth:1,
        
    },
    caseTitle: {
        fontSize: 12,
    }
})

export default CasesListView;