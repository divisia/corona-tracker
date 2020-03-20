import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { getMediaUri } from "../utilities/constants";
import i18n from 'i18n-js';


export default class VirusInfo extends Component {
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.section}>
                    <View style={styles.headerWrapper}>
                        <Text style={styles.header}>{i18n.t('covid19Symptoms')}</Text>
                    </View>
                    <View style={styles.sectionContext}>

                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("symptoms/0.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>{i18n.t('headache')}</Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("symptoms/1.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>{i18n.t('soreThroat')}</Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("symptoms/2.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>{i18n.t('breathShortness')}</Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("symptoms/3.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>{i18n.t('cough')}</Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("symptoms/4.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>{i18n.t('fewer')}</Text>
                        </View>

                    </View>
                </View>

                {/* Prevention */}
                <View style={styles.section}>
                    <View style={styles.headerWrapper}>
                        <Text style={styles.header}>{i18n.t('covid19Avoid')}</Text>
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
                                source={{ uri: getMediaUri("prevention/2.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>{i18n.t('socialDistance')}</Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("prevention/3.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>{i18n.t('dontTouchFace')}</Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("prevention/4.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>{i18n.t('washHands')}</Text>
                        </View>
                        <View style={styles.sectionItem}>
                            <Image
                                source={{ uri: getMediaUri("prevention/6.png") }}
                                style={styles.image} />
                            <Text style={styles.sectionItemText}>{i18n.t('seekMedicalCare')}</Text>
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
        width: "100%",
        minWidth:50,
        minHeight:50,
        aspectRatio:1,
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
        textAlign:"left",
        maxWidth:"33%",
        minWidth:"10%"
    },
    sectionItemText: {
        paddingHorizontal:4,
        paddingBottom:4,
        fontSize: 14,
        color:"#333",
        textAlign:"left"
    }
})