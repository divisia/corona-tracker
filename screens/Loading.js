import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


const Loading = () => {
    return (
    <View style={styles.loadingScreen}>
        <Text>Loading..</Text>
    </View>
    );
};

const styles = StyleSheet.create({
    loadingScreen:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    }
});

export default Loading;