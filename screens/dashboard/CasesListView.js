import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Divider, ListItem, Header, Badge } from 'react-native-elements'
import { DatabaseContext } from "../../components/DatabaseContext";
import { Ionicons } from '@expo/vector-icons'
import i18n from 'i18n-js';
import { TouchableOpacity } from 'react-native-gesture-handler';


const NA = "N/A";


class CasesListView extends React.Component {

    render() {
        return (
            <DatabaseContext.Consumer>
                {(context) => {
                    const { reported } = context;
                    const loading = reported.loading;
                    return (
                        <View style={styles.cases}>
                            <TouchableOpacity style={{ flexDirection: "row", padding: 3 }}>
                                <Text style={{ color: "darkgray" }}>Self reported</Text>
                                <Ionicons name="md-information-circle-outline" size={10} color={"darkgray"} />
                            </TouchableOpacity>
                            <ListItem
                                leftElementStyle={styles.caseTitle}
                                rightElement={(<Text>{reported.data.sympHigh.now}</Text>)}
                                leftElement={
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ margin: 4, backgroundColor: "brown", width: 12, height: 12 }} />
                                        <Text>{i18n.t('sympHigh')}</Text>
                                        <Ionicons name="md-information-circle-outline" size={10} color={"darkgray"} />
                                    </View>}
                                containerStyle={styles.caseItems}
                                bottomDivider
                                key={Math.random().toString()}
                                contentContainerStyle={{ paddingHorizontal: 10 }}
                            />
                            <ListItem
                                leftElementStyle={styles.caseTitle}
                                rightElement={(<Text>{reported.data.sympMedium.now}</Text>)}
                                leftElement={
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ margin: 4, backgroundColor: "cyan", width: 12, height: 12 }} />
                                        <Text>{i18n.t('sympMedium')}</Text>
                                        <Ionicons name="md-information-circle-outline" size={10} color={"darkgray"} />
                                    </View>}
                                containerStyle={styles.caseItems}
                                bottomDivider
                                key={Math.random().toString()}
                                contentContainerStyle={{ paddingHorizontal: 10 }}
                            />
                            <ListItem
                                leftElementStyle={styles.caseTitle}
                                rightElement={(<Text>{reported.data.sympLow.now}</Text>)}
                                leftElement={
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ margin: 4, backgroundColor: "purple", width: 12, height: 12 }} />
                                        <Text>{i18n.t('sympLow')}</Text>
                                        <Ionicons name="md-information-circle-outline" size={10} color={"darkgray"} />
                                    </View>}
                                containerStyle={styles.caseItems}
                                bottomDivider
                                key={Math.random().toString()}
                                contentContainerStyle={{ paddingHorizontal: 10 }}
                            />
                            <ListItem
                                leftElementStyle={styles.caseTitle}
                                rightElement={(<Text>{reported.data.asympMedium.now}</Text>)}
                                leftElement={
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ margin: 4, backgroundColor: "gold", width: 12, height: 12 }} />
                                        <Text>{i18n.t('asympMedium')}</Text>
                                        <Ionicons name="md-information-circle-outline" size={10} color={"darkgray"} />
                                    </View>}
                                containerStyle={styles.caseItems}
                                bottomDivider
                                key={Math.random().toString()}
                                contentContainerStyle={{ paddingHorizontal: 10 }}
                            />
                            <ListItem
                                leftElementStyle={styles.caseTitle}
                                rightElement={(<Text>{reported.data.asympLow.now}</Text>)}
                                leftElement={
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ margin: 4, backgroundColor: "blue", width: 12, height: 12 }} />
                                        <Text>{i18n.t('asympLow')}</Text>
                                        <Ionicons name="md-information-circle-outline" size={10} color={"darkgray"} />
                                    </View>}
                                containerStyle={styles.caseItems}
                                bottomDivider
                                key={Math.random().toString()}
                                contentContainerStyle={{ paddingHorizontal: 10 }}
                            />
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
        flex: 5,
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    caseItems: {
        margin: 2,
        padding: 6,
        backgroundColor: "transparent",
        borderColor: "darkgray",
        borderWidth: 1,
    },
    caseTitle: {
        fontSize: 12,
    }
})

export default CasesListView;