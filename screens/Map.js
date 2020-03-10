import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import MapView from 'react-native-maps';


const checkMapAvailability = () => {
    const mapsScriptLoaded = typeof google !== 'undefined'
    return navigator.onLine;
}

const Map = (props) => {
    const mapAvailable = checkMapAvailability();
    if (false&&!mapAvailable) {
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
        <View style={styles.center}>
            <View style={styles.legendsContainer}>
                <Text>LEGENDS GOES HERE</Text>
            </View>
            <View style={styles.mapWrapper}>
                <MapView
                    style={{ width: "100%", height: "100%" }}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    homescreen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign:"center",
        padding:"20%",
    },
    center:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    legendsContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    mapWrapper: {
        height: "100%",
        width: "100%",
        flex: 6
    }
});

export default Map;