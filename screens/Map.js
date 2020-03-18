import React, { Component, useContext } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity, StatusBar, Platform } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { DatabaseContext } from '../components/DatabaseContext';
Platform.OS !== 'web' ? ClusterMap = require("react-native-cluster-map") : null;


const checkMapAvailability = () => {
    const mapsScriptLoaded = typeof google !== 'undefined'
    return mapsScriptLoaded;
}

const layers = {
    deaths: "casesDeaths",
    infections: "casesInfections",
    recoveries: "casesRecoveries",
    self_reported_positive: "reportedSymptomaticPositive",
    self_reported_negative: "reportedSymptomaticNegative",
}

const heatColors = {
    casesDeaths: ["#79BC6A", "#EEC20B", "#E50000"],
    casesInfections: ["#00D4FF", "#090979", "#020024"],
    casesRecoveries: ["#E00005", "#79BC6A", "#EEC20B"],
    reportedSymptomaticNegative: ["#79BC6A", "#EEC20B", "#E50000"],
    reportedSymptomaticPositive: ["#E00005", "#EEC20B", "#79BC6A"],
}

const layersArray = [];
for (var la in layers) {
    layersArray.push(layers[la])
}

const Legend = (props) => {
    return (
        <View style={styles.legendsContainer}>
            <View key={Math.random.toString()}>
                <TouchableOpacity style={styles.legends} onPress={() => { props.toggleLayer(layer) }}>
                    <Text>{""}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


class Map extends Component {
    state = {
        visibleLayers: [layers.deaths],
    }

    toggleLayer = (layerName) => {
        const visibleLayers = this.state.visibleLayers;
        if (visibleLayers.includes(layerName)) visibleLayers.splice(visibleLayers.indexOf(layerName), 1);
        else visibleLayers.push(layerName);
        this.setState({ visibleLayers: visibleLayers });
    }

    render() {
        const mapAvailable = checkMapAvailability();
        if (!mapAvailable) {
            // The screen when map is not available, offline etc.
            return (
                <View style={styles.homescreen}>
                    <Text>
                        Map is not available at the moment.
                        Sorry for the inconvenience.
                    </Text>
                </View>
            );
        }
        return (
            <DatabaseContext.Consumer>
                {(context) => {
                    return (
                        <View style={styles.center}>
                            {Platform.OS !== 'web' ?
                                <View style={styles.mapWrapper}>

                                    <ClusterMap
                                        style={{ width: "100%", height: "100%" }}
                                        region={{
                                            latitude: 38.9637,
                                            longitude: 35.2433,
                                            latitudeDelta: 30,
                                            longitudeDelta: 60,
                                        }}
                                        provider={PROVIDER_GOOGLE}>
                                        <Marker coordinate={{ latitude: 37.78725, longitude: -122.434 }} />
                                        
                                    </ClusterMap>

                                </View>
                                : <View style={{ textAlign: "center", alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ fontSize: 20 }}>We cannot provide map for web. Sorry for inconvenience.</Text>
                                </View>}
                        </View>

                    )
                }}
            </DatabaseContext.Consumer>
        );
    }
};

const styles = StyleSheet.create({
    homescreen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20%",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    legendsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    legends: {
        marginHorizontal: 2,
        marginVertical: 3,
        padding: 6,
        borderColor: "lightgray",
        borderWidth: 1,
        borderRadius: 10
    },
    legendEnabled: {
        marginHorizontal: 10,
        marginVertical: 4,
        padding: 7,
        borderColor: "green",
        borderWidth: 2,
    },
    mapWrapper: {
        height: "100%",
        width: "100%",
        flex: 6
    }
});

export default Map;