import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Divider, ListItem, Header, Badge } from 'react-native-elements'
import firestore from "../../libraries/Firestore"


const CasesListView = (props) => {
    const { positive, negative, not_tested, test_pending } = props.reports;
    return (
        <View style={styles.cases}>
            <ListItem
                title={ positive.title }
                badge={{ value: positive.value, textStyle:{color:"white", backgroundColor:"transparent"} }}
                containerStyle={styles.caseItems}
                bottomDivider
                leftElement={<Badge value="" status="error"/>}
                contentContainerStyle={{paddingHorizontal:10}}
            />
            <ListItem
                title={ negative.title }
                badge={{ value: negative.value, textStyle:{color:"white", backgroundColor:"transparent"} }}
                containerStyle={styles.caseItems}
                bottomDivider
                leftElement={<Badge value="" status="error"/>}
                contentContainerStyle={{paddingHorizontal:10}}
            />
            <ListItem
                title={ not_tested.title }
                badge={{ value: not_tested.value, textStyle:{color:"white", backgroundColor:"transparent"} }}
                containerStyle={styles.caseItems}
                bottomDivider
                leftElement={<Badge value="" status="error"/>}
                contentContainerStyle={{paddingHorizontal:10}}
            />
            <ListItem
                title={ test_pending.title }
                badge={{ value: test_pending.value, textStyle:{color:"white", backgroundColor:"transparent"} }}
                containerStyle={styles.caseItems}
                bottomDivider
                leftElement={<Badge value="" status="error"/>}
                contentContainerStyle={{paddingHorizontal:10}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    cases: {
        width: "100%",
        flex:5,
        flexDirection:"column",
        justifyContent:"space-evenly",
    },
    caseItems: {
        margin: 0,
        padding: 10,
    }
})

export default CasesListView;