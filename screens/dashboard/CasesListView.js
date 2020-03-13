import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Divider, ListItem, Header, Badge } from 'react-native-elements'
import { DatabaseContext } from "../../components/DatabaseContext";
import i18n from 'i18n-js';


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
                            <ListItem
                                title={i18n.t('reportedSymptomaticPositive')}
                                rightElement={(<Text>{loading ? NA : reported.data.positive.now}</Text>)}
                                containerStyle={styles.caseItems}
                                bottomDivider
                                key={Math.random().toString()}
                                contentContainerStyle={{ paddingHorizontal: 10 }}
                            />
                            <ListItem
                                title={i18n.t('reportedSymptomaticNegative')}
                                rightElement={(<Text>{loading ? NA : reported.data.negative.now}</Text>)}
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
        padding: 10,
        backgroundColor:"transparent",
        borderColor:"darkgray",
        borderWidth:1,
    }
})

export default CasesListView;