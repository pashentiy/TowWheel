import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';


const HomeScreen = () => {
    return (
        <View style={s.container}>
            {/* <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems:'center' }}> */}
            <MapView
                style={s.container}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
            </MapView>
            <Text style={{}}>Google Map</Text>
            {/* </ScrollView> */}
        </View >
    );
}

export default HomeScreen;


const s = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',

    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    balanceView: {
        marginVertical: 20
    },
    verificationView: {
        marginTop: 20
    }
})