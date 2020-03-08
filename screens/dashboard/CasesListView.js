import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Divider, ListItem, Header, Badge } from 'react-native-elements'

const dummyData = [
    {
        "title": "WHO Confirmed Deaths",
        "value": "199",
        "query": "dashboard:confirmed:deaths",
    }, {
        "title": "WHO Confirmed Infections",
        "value": "6499",
        "query": "dashboard:confirmed:infections",
    }, {
        "title": "WHO Confirmed Recoveries",
        "value": "7234",
        "query": "dashboard:confirmed:infections",
    },{
        "title": "Self Reported Positive",
        "value": "33",
        "query": "dashboard:confirmed:deaths",
    }, {
        "title": "Self Reported Negative",
        "value": "245",
        "query": "dashboard:confirmed:infections",
    }, {
        "title": "Symptomatic Not Tested",
        "value": "6343",
        "query": "dashboard:confirmed:infections",
    },{
        "title": "Symtomatic Test Pending",
        "value": "32",
        "query": "dashboard:confirmed:infections",
    }
    

]

const CasesListView = (props) => {
    return (
        <View style={styles.cases}>
            
            {
                dummyData.map((item, index) => (
                    <ListItem
                        key={index}
                        title={item.title}
                        badge={{ value: item.value, textStyle:{color:"white", backgroundColor:"darkgray"} }}
                        containerStyle={styles.caseItems}
                        bottomDivider
                        leftElement={<Badge value="" status="error"/>}
                        contentContainerStyle={{paddingHorizontal:10}}
                    />
                ))
            }
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