import React, { Component, useContext } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity, StatusBar, Platform } from 'react-native'
import MapView, { Heatmap, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { DatabaseContext } from '../components/DatabaseContext';
import i18n from 'i18n-js';

const checkMapAvailability = () => {
    const mapsScriptLoaded = typeof google !== 'undefined'
    return mapsScriptLoaded;
}


const HEATMAPOINTS = [
    {latitude: 49.986111, longitude: 20.061667, weight: 1},
    {latitude:50.193139, longitude:20.288717, weight: 2},
    {latitude:49.740278, longitude:19.588611, weight: 1},
    {latitude:50.061389, longitude:19.938333, weight: 8},
    {latitude:50.174722, longitude:20.986389, weight: 11},
    {latitude:50.064507, longitude:19.920777, weight: 98},
    {latitude:49.3, longitude:19.95, weight: 41},
    {latitude:49.833333, longitude:19.940556, weight: 66},
    {latitude:49.477778, longitude:20.03, weight: 9},
    {latitude:49.975, longitude:19.828333, weight: 11},
    {latitude:50.357778, longitude:20.0325, weight: 33},
    {latitude:50.0125, longitude:20.988333, weight: 76},
    {latitude:50.067959, longitude:19.91266, weight: 63},
    {latitude:49.418588, longitude:20.323788, weight: 52},
    {latitude:49.62113, longitude:20.710777, weight: 88},
    {latitude:50.039167, longitude:19.220833, weight: 1},
    {latitude:49.970495, longitude:19.837214, weight: 78},
    {latitude:49.701667, longitude:20.425556, weight: 1},
    {latitude:50.078429, longitude:20.050861, weight: 1},
    {latitude:49.895, longitude:21.054167, weight: 1},
    {latitude:50.27722, longitude:19.569658, weight: 65},
    {latitude:49.968889, longitude:20.606389, weight: 1},
    {latitude:49.51232, longitude:19.63755, weight: 1},
    {latitude:50.018077, longitude:20.989849, weight: 35},
    {latitude:50.081698, longitude:19.895629, weight: 22},
    {latitude:49.968889, longitude:20.43, weight: 54},
    {latitude:50.279167, longitude:19.559722, weight: 1},
    {latitude:50.067947, longitude:19.912865, weight: 69},
    {latitude:49.654444, longitude:21.159167, weight: 1},
    {latitude:50.099606, longitude:20.016707, weight: 80},
    {latitude:50.357778, longitude:20.0325, weight: 99},
    {latitude:49.296628, longitude:19.959694, weight: 1},
    {latitude:50.019014, longitude:21.002474, weight: 46},
    {latitude:50.056829, longitude:19.926414, weight: 22},
    {latitude:49.616667, longitude:20.7, weight: 1},
    {latitude:49.883333, longitude:19.5, weight: 33},
    {latitude:50.054217, longitude:19.943289, weight: 1},
    {latitude:50.133333, longitude:19.4, weight: 100}
  ];

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

                                    


                                            {context.heatmap==null?null:
                                            <Heatmap
                                            points={ context.heatmap["casesDeaths"].points.filter((p)=>{return p.weight>0&&p.longitude&&p.latitude}) }
                                            radius={50}
                                            gradient={{
                                                colors: ["#79BC6A",  "#F29305", "#E50000"],
                                                startPoints: [0,  0.2, 1],
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