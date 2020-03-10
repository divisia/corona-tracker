import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Divider, ListItem, Header, Badge } from 'react-native-elements'
import firestore from "../../libraries/Firestore"


class CasesListView extends React.Component {

    render() {
        return (
            <View style={styles.cases}>
                <ListItem
                    title=""
                    rightElement={(<Text></Text>)}
                    containerStyle={styles.caseItems}
                    bottomDivider
                    leftElement={<Badge value="" status="error" />}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                />
                <ListItem
                    title=""
                    rightElement={(<Text></Text>)}
                    containerStyle={styles.caseItems}
                    bottomDivider
                    leftElement={<Badge value="" status="error" />}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                />
                <ListItem
                    title=""
                    rightElement={(<Text></Text>)}
                    containerStyle={styles.caseItems}
                    bottomDivider
                    leftElement={<Badge value="" status="error" />}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                />
            </View>
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