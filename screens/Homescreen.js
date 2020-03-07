import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'


const Homescreen = (props) => {
    const { navigation } = (props);
    return (
        <View style={styles.homescreen}>
            <Text>Homepage</Text>
            <Button
                title="load"
                onPress={() => navigation.navigate('Loading')}
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

export default Homescreen;