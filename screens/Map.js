import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import MapView from 'react-native-maps';


const Map = (props) => {
    const { navigation } = (props);
    return (
        <View style={styles.homescreen}>
            <MapView
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    homescreen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default Map;