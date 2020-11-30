import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { DestinationButton } from './DestinationButton';
import TowMarker from './TowMarker';


const HomeScreen = () => {
  return (
    <View style={s.container}>
      {/* <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems:'center' }}> */}
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{ flex: 1 }}
        region={{
          latitude: 31.750139,
          longitude: 35.2372,
          latitudeDelta: 0.005,
          longitudeDelta: 0.0025,
        }}
        showsUserLocation
        loadingEnabled>
      <TowMarker></TowMarker>
      </MapView>
      <DestinationButton />
      {/* <Text style={{}}>Google Map</Text> */}
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