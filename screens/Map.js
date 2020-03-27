import React, { Component, useContext } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity, StatusBar, Platform } from 'react-native'
import MapView, { Heatmap, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { DatabaseContext } from '../components/DatabaseContext';
import i18n from 'i18n-js';

const checkMapAvailability = () => {
    const mapsScriptLoaded = typeof google !== 'undefined'
    return mapsScriptLoaded;
}


const heatColors = {
    casesDeaths: ["#79BC6A", "#EEC20B", "#E50000"],
    casesInfections: ["#00D4FF", "#090979", "#020024"],
    casesRecoveries: ["#E00005", "#79BC6A", "#EEC20B"],
    reportedSymptomaticNegative: ["#79BC6A", "#EEC20B", "#E50000"],
    reportedSymptomaticPositive: ["#E00005", "#EEC20B", "#79BC6A"],
}


const Legend = (props) => {
    return (
        <TouchableOpacity
            style={props.visible ? styles.visibleLegend : styles.disabledLegend}
            onPress={() => { props.toggleLayer(props.layer) }}>
            <Text style={props.visible ? styles.visibleLegendText : styles.disabledLegendText}>{i18n.t(props.layer)}</Text>
        </TouchableOpacity>
    );
}


class Map extends Component {
    state = {
        visibleLayer: "casesDeaths",
    }

    toggleLayer = (layerName) => {
        this.setState({ visibleLayer: layerName });
    }

    render() {
        const mapAvailable = checkMapAvailability();
        if (false && !mapAvailable) {
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
                    if (context.heatmap) console.log("CTX HM LEN:", context.heatmap.casesDeaths.points[0])
                    return (
                        <View style={styles.center}>
                            <View style={styles.mapWrapper}>

                                <View style={styles.legendsContainer}>
                                    {context.heatmap ? Object.keys(context.heatmap).map((layerName) => {
                                        return (
                                            <Legend layer={layerName}
                                                key={Math.random().toString()}
                                                visible={layerName === this.state.visibleLayer}
                                                toggleLayer={this.toggleLayer} />);
                                    }) : null}
                                </View>

                                <MapView
                                    style={{ width: "100%", height: "100%" }}
                                    initialRegion={{
                                        latitude: 38.9637,
                                        longitude: 35.2433,
                                        latitudeDelta: 30,
                                        longitudeDelta: 60,
                                    }}
                                //provider={PROVIDER_GOOGLE}
                                >




                                    {context.heatmap == null ? null :
                                        <Heatmap
                                            points={context.heatmap["casesDeaths"].points.filter((p) => { return p.weight > 0 && p.longitude && p.latitude })}
                                            radius={50}
                                            gradient={{
                                                colors: ["#79BC6A", "#F29305", "#E50000"],
                                                startPoints: [0, 0.2, 1],
                                                colorMapSize: 200
                                            }}
                                        />}




                                </MapView>
                            </View>
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
        justifyContent: "center",
        alignItems: "center",
    },
    visibleLegend: {
        marginHorizontal: 6,
        marginVertical: 2,
        padding: 4,
        color: "white",
        borderColor: "black",
        backgroundColor: "#232323",
        borderWidth: 2,
    },
    visibleLegendText: {
        color: "white",
    },
    disabledLegend: {
        marginHorizontal: 6,
        marginVertical: 2,
        padding: 4,
        color: "black",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 4
    },
    mapWrapper: {
        height: "100%",
        width: "100%",
        flex: 6
    }
});

export default Map;