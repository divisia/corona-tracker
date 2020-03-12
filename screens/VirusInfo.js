import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { getMediaUri } from "../utilities/constants";
import * as Font from 'expo-font';


export default class VirusInfo extends Component {
    async componentDidMount(){
        await Font.loadAsync({
            'Montserrat-ExtraBold': require('../assets/fonts/Montserrat/Montserrat-ExtraBold.ttf'),
          });
    }
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.section}>
                    <View style={styles.headerWrapper}>
                        <Text style={styles.header}>What are the symptoms of COVID-19?</Text>
                    </View>
                    <View style={styles.sectionContext}>

                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("symptoms/0.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>Headache</Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("symptoms/1.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>Sore throat</Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("symptoms/2.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>Shortness of breath</Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("symptoms/3.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>Cough</Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("symptoms/4.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>Fewer</Text>
                        </View>

                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.headerWrapper}>
                        <Text style={styles.header}>How can I avoid getting infected?</Text>
                    </View>
                    <View style={styles.sectionContext}>

                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("prevention/0.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>Avoid crowd</Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("prevention/1.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>Wear mask</Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("prevention/2.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>Avoid contact with sick people</Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("prevention/3.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>Don't touch your face with unwashed hands</Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("prevention/4.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>Regularly wash your hands</Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("prevention/5.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>Don't share your food</Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("prevention/6.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>If you become sick, seek medical care immedately</Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("prevention/7.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>Avoid travelling unless necessary</Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("prevention/8.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>Avoid contact with animals and animal products</Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("prevention/9.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>Do not eat raw food</Text>
                        </View>

                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.headerWrapper}>
                        <Text style={styles.header}>What do I do if I am infected?</Text>
                    </View>
                    <View style={styles.sectionContext}>

                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("infected/0.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>Put tissues in trash bin after washing hands</Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("infected/1.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>Keep objects and surfaces clean</Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("infected/2.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>Avoid contact with others</Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("infected/3.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>Cover your mouth when you sneeze</Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("infected/4.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>Stay at home</Text>
                        </View>

                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems:"flex-end",
        justifyContent:"flex-start"
    },
    header: {
        fontSize: 20,
        fontFamily:"Montserrat-ExtraBold",
    },
    headerWrapper:{
        alignItems:"flex-start",
        margin:16,
    },
    section: {
        width: "100%",
        marginBottom:30
    },
    image: {
        height: 100, width: "100%",
        marginBottom:5
    },
    sectionContext: {
        flexDirection: "row",
        flexWrap:"wrap",
    },
    sectionItem: {
        margin:10,
        alignItems:"flex-start",
        flexWrap:"wrap",
        width:100,
        borderColor:"#ddd",
        borderWidth:1,
        textAlign:"left"
    },
    sectionItemText: {
        paddingHorizontal:4,
        paddingBottom:4,
        fontSize: 14,
        color:"#333",
        textAlign:"left"
    }
})