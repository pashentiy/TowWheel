import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


const HomeScreen = () => {
    return (
        <View style={s.container}>
            {/* <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems:'center' }}> */}
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={s.container}
                region={{
                    latitude: -33.86,
                    longitude: 151.20,
                }}
            />
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