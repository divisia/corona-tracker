import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Divider, ListItem, Header, Badge } from 'react-native-elements'
import { DatabaseContext } from "../../components/DatabaseContext";


class CasesListView extends React.Component {

    render() {
        return (
            <DatabaseContext.Consumer>
                {(context) => {
                    const { cases } = context;
                    const deadCount = (typeof cases.data === 'undefined' || typeof cases.data.dead === 'undefined') ? "N/A" : cases.data.dead.now
                    return (
                        <View style={styles.cases}>
                            <ListItem
                                title="Deaths"
                                rightElement={(<Text>{deadCount}</Text>)}
                                containerStyle={styles.caseItems}
                                bottomDivider
                                leftElement={<Badge value="" status="error" />}
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
        justifyContent: "space-evenly",
    },
    caseItems: {
        margin: 0,
        padding: 10,
    }
})

export default CasesListView;