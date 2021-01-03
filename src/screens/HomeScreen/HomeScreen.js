import React, { Component, Fragment, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { DestinationButton } from './DestinationButton';
import TowMarker from './TowMarker';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from "react-native-geocoding";
import Search from './Search';
import Directions from './Directions';
import Details from "./Details";

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


Geocoder.init("AIzaSyD70sNQXz0OFl8kp2yTCIS_uHDke2vo11U");

export default HomeScreen = () => {
  const mapRef = useRef(null);
  const [state, setState] = useState({
    region: null,
    destination: null,
    duration: null,
    address: null,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        const response = await Geocoder.from({ latitude, longitude });
        const address = response.results[0].formatted_address;
        const location = address.substring(0, address.indexOf("/"));
        console.log('ADRESS2-------------', address);
        // const location = address;
        setState({
          location,
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134
          },
        });

      }, //success
      () => { }, //error
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000
      }
    );
  }, [])

  useEffect(() => {
    Geolocation.watchPosition(
      position => {
        console.log('POSITION -> ', position)
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        // let angle = position.coords.heading;
        //add path
        setState((oldState) => {
          return {
            ...oldState, region: {
              latitude,
              longitude,
              latitudeDelta: 0.0143,
              longitudeDelta: 0.0134
            }
          }
        })
      },
      () => { }, //error
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 1000
      }
    );
  }, [])

  handleLocationSelected = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude }
    } = geometry;
    setState(oldState => {
      return {
        ...oldState, destination: {
          latitude,
          longitude,
          title: data.structured_formatting.main_text
        }
      }
    });
  };
  handleBack = () => {
    setState(oldState => {
      return {
        ...oldState, destination: null
      }
    });
  };

  const { region, destination, duration, address } = state;

  return (

    <View style={s.container}>
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
        ref={mapRef}
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

                // setState( { duration: Math.floor(result.duration) });
                setState((oldState) => { return { ...oldState, duration: Math.floor(result.duration) } })
                mapRef.current.fitToCoordinates(result.coordinates, {
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
        {/* <MapView.Marker.Animated
            title={'Me'}
            style={{
              // transform: { rotate: `${angle}deg` },
              width: 20,
              height: 20
            }}
            coordinate={region}> */}
        {/* <Image source={images.homescreen.markerBusyTowTruck} style={{ height: 50, width: 33 }} /> */}

        {/* coordinate={firstSimulator.simLongitude, firstSimulator.simLatitude} > */}
        {/* </MapView.Marker.Animated> */}
        {/* <AnimatedMarkers/> */}
      </MapView>
      {/* <DestinationButton /> */}


      {destination ? (
        // <Details/>
        <Fragment>
          <Back onPress={handleBack}>
            <Image source={images.homescreen.arrowLeftBlack} style={{ width: 30, height: 25 }} />
          </Back>
          <Details />
        </Fragment>
      ) : (
          <Search onLocationSelected={handleLocationSelected} />
        )}

    </View >
  )

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
})