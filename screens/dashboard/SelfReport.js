import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import Modal, { ModalContent, ModalButton, ModalFooter } from 'react-native-modals'


const reportNotSymptomatic = () => { }
const reportSymptomaticPositive = () => { }
const reportSymptomaticNegative = () => { }
const reportSymptomaticNotTested = () => { }
const reportSymptomaticTestPending = () => { }




const SelfReport = (props) => {
    const [visible, setVisible] = useState(false);

    const questionAnswerSaved = (
        <ModalContent>
            <View>
                <Text>Thank you.</Text>
                <Text>Your answer has been recorded.</Text>
                <Button title="OK" onPress={()=>{setVisible(false)}}/>
            </View>
        </ModalContent>
    );
    
    const questionIsTested = (
        <ModalContent>
            <View>
                <Text>Have you tested positive?</Text>
                <Button title="Yes" onPress={()=>{reportSymptomaticPositive(); setQuestion(questionAnswerSaved); }} />
                <Button title="No" onPress={()=>{reportSymptomaticNegative(); setQuestion(questionAnswerSaved);}}  />
                <Button title="Not tested" onPress={()=>{reportSymptomaticNotTested(); setQuestion(questionAnswerSaved);}}  />
                <Button title="Test pending" onPress={()=>{reportSymptomaticTestPending(); setQuestion(questionAnswerSaved); }}  />
            </View>
        </ModalContent>
    )
    const questionIsSymptomatic = (
        <ModalContent>
            <View>
                <Text>Are you having symptoms?</Text>
                <Button title="Yes" onPress={()=>{setQuestion(questionIsTested)}} />
                <Button onPress={()=>{reportNotSymptomatic(); setVisible(false);}} title="No" />
            </View>
        </ModalContent>
    )
    
    const [question, setQuestion] = useState(questionIsSymptomatic);

    return (
        <View style={styles.selfReport}>
            <Text>Symptoms? Help tracking COVID-19</Text>
            <Button onPress={() => { setVisible(true) }} title="Report" />
            <Modal
                visible={visible}
                onTouchOutside={() => { setVisible(false) }}
                shouldUpdate={false}>
                {question}
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    selfReport: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: "green",
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    }
});

export default SelfReport;