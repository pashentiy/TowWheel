import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { DestinationButton } from './DestinationButton';
import TowMarker from './TowMarker';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from "react-native-geocoding";
import Search from './Search';
import Directions from './Directions';
import { images } from '../../utilities';
import {
  Back,
  LocationBox,
  LocationBoxOrigin,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall
} from "./styles";

// import getPixelSize from '../../utilities/getPixelSize'; TODO:// Why can't to import it ?

Geocoder.init("AIzaSyD70sNQXz0OFl8kp2yTCIS_uHDke2vo11U");


export default class HomeScreen extends Component {
  state = {
    region: null,
    destination: null,
    duration: null,
    location: null,
    price: null,
    address:null
  };

  async componentDidMount() {
    Geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        const response = await Geocoder.from({ latitude, longitude });
        const address = response.results[0].formatted_address;
        const location = address.substring(0, address.indexOf("/"));
        console.log('ADRESS2-------------', address);
        // const location = address;
        this.setState({
          address: location,
          location,
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134
          }
        });
      }, //success
      () => { }, //error
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000
      }
    );
  }

  handleLocationSelected = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude }
    } = geometry;
    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text
      }
    });
  };
  render() {
    const { region, destination, duration, location, address, price } = this.state;
    return (
      <View style={s.container}>
        {/* <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems:'center' }}> */}

        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={{ flex: 1 }}
          // region={{
          //   latitude: 31.750139,
          //   longitude: 35.2372,
          //   latitudeDelta: 0.005,
          //   longitudeDelta: 0.0025,
          // }}
          region={region}
          showsUserLocation
          loadingEnabled
          ref={(el) => (this.mapView = el)}
        >
          {destination && (
            <Fragment>
              <Directions
                origin={region}
                destination={destination}
                onReady={(result) => {
                  console.log('-----', result);
                  console.log('Coordinates', result.coordinates);
                  console.log('distance', result.distance);
                  console.log('duration', result.duration);
                  
                  this.setState({ duration: Math.floor(result.duration) });
                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: 50,
                      left: 50,
                      top: 50,
                      bottom: 150
                    }
                  });
                }} />
              <Marker
                coordinate={destination}
                anchor={{ x: 0.1, y: 0.1 }}>{/* end marker */}
                <Image source={images.homescreen.endOFDirectionMarker} style={{ height: 20, width: 20 }} />
                <LocationBox>
                  <LocationText>{destination.title}</LocationText>{/* end Info place marker */}
                </LocationBox>
              </Marker>

              <Marker coordinate={region} anchor={{ x: 0.35, y: 0.35 }}>{/* Start Info Min marker */}
                <LocationBoxOrigin>
                  <LocationTimeBox>
                    <LocationTimeText>{duration}</LocationTimeText>
                    <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                  </LocationTimeBox>
                  <LocationText>{address}</LocationText> 
                </LocationBoxOrigin>
              </Marker>
            </Fragment>
          )}

          {/* <TowMarker></TowMarker> */}
        </MapView>
        {/* <DestinationButton /> */}


        <Search onLocationSelected={this.handleLocationSelected} />

        {/* <Text style={{}}>Google Map</Text> */}
        {/* </ScrollView> */}
      </View >
    );
  }
}

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