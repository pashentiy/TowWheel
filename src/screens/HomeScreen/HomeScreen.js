import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { DestinationButton } from './DestinationButton';
import TowMarker from './TowMarker';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from "react-native-geocoding";
import Search from './Search';
import Directions from './Directions';
import Details from "./Details";
// import AnimatedMarkers from "./AnimatedMarkers"

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

var index = 0;
export default class HomeScreen extends Component {
  state = {
    region: null,
    destination: null,
    duration: null,
    location: null,
    price: null,
    address: null,
    firstSimulator: {
      simLatitude: null,
      simLongitude: null,
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134
    }
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
          },
          firstSimulator: {
            simLatitude: latitude,
            simLongitude: longitude,
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
    navigator.geolocation.watchPosition(
      position => {
        console.log('POSITION -> ', position)
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        // let angle = position.coords.heading;
        //add path
        this.setState({
          address: location,
          location,
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134
          },
          firstSimulator: {
            simLatitude: latitude,
            simLongitude: longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134
          }
        });
      },
      () => { }, //error
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 1000
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
  handleBack = () => {
    this.setState({ destination: null });
  };

  updateSimulator = () => {
    console.log('POP');
    const path = [{ "latitude": 31.75014, "longitude": 35.23721 }, { "latitude": 31.75059, "longitude": 35.2372 }, { "latitude": 31.75084, "longitude": 35.23719 }, { "latitude": 31.75102, "longitude": 35.23714 }, { "latitude": 31.75128, "longitude": 35.23702 }, { "latitude": 31.75153, "longitude": 35.23686 }, { "latitude": 31.75177, "longitude": 35.23668 }, { "latitude": 31.75207, "longitude": 35.23645 }, { "latitude": 31.75226, "longitude": 35.23628 }, { "latitude": 31.75248, "longitude": 35.23609 }, { "latitude": 31.75273, "longitude": 35.23582 }, { "latitude": 31.75285, "longitude": 35.23566 }, { "latitude": 31.75292, "longitude": 35.23547 }, { "latitude": 31.75299, "longitude": 35.23528 }, { "latitude": 31.75299, "longitude": 35.23517 }, { "latitude": 31.75301, "longitude": 35.23486 }, { "latitude": 31.75303, "longitude": 35.23433 }, { "latitude": 31.75302, "longitude": 35.23312 }, { "latitude": 31.75306, "longitude": 35.23257 }, { "latitude": 31.75325, "longitude": 35.23214 }, { "latitude": 31.75329, "longitude": 35.23214 }, { "latitude": 31.75334, "longitude": 35.23212 }, { "latitude": 31.75346, "longitude": 35.23213 }, { "latitude": 31.75373, "longitude": 35.23218 }, { "latitude": 31.75391, "longitude": 35.23221 }, { "latitude": 31.75407, "longitude": 35.23218 }, { "latitude": 31.75421, "longitude": 35.23205 }, { "latitude": 31.7543, "longitude": 35.23184 }, { "latitude": 31.75436, "longitude": 35.23156 }, { "latitude": 31.75439, "longitude": 35.23132 }, { "latitude": 31.75443, "longitude": 35.2309 }, { "latitude": 31.75457, "longitude": 35.22961 }, { "latitude": 31.75465, "longitude": 35.2292 }, { "latitude": 31.7547, "longitude": 35.22895 }, { "latitude": 31.75483, "longitude": 35.22855 }, { "latitude": 31.75506, "longitude": 35.22797 }, { "latitude": 31.75545, "longitude": 35.22706 }, { "latitude": 31.75554, "longitude": 35.22679 }, { "latitude": 31.75565, "longitude": 35.22625 }, { "latitude": 31.75571, "longitude": 35.22562 }, { "latitude": 31.75571, "longitude": 35.2252 }, { "latitude": 31.75581, "longitude": 35.22436 }, { "latitude": 31.75584, "longitude": 35.22373 }, { "latitude": 31.7559, "longitude": 35.22315 }, { "latitude": 31.756, "longitude": 35.22269 }, { "latitude": 31.75607, "longitude": 35.22247 }, { "latitude": 31.75624, "longitude": 35.22239 }, { "latitude": 31.75629, "longitude": 35.22237 }, { "latitude": 31.75641, "longitude": 35.22236 }, { "latitude": 31.75658, "longitude": 35.22244 }, { "latitude": 31.75688, "longitude": 35.22258 }, { "latitude": 31.75708, "longitude": 35.22266 }, { "latitude": 31.75775, "longitude": 35.22292 }, { "latitude": 31.75809, "longitude": 35.22307 }, { "latitude": 31.75866, "longitude": 35.22331 }, { "latitude": 31.7587, "longitude": 35.2232 }, { "latitude": 31.75879, "longitude": 35.22292 }];
    index += 1;
    setInterval(() => {
      if (index<path.length){
        this.setState({
          firstSimulator: {
            simLatitude: path[path.length - index].latitude,
            simLongitude: path[path.length - index].longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134
          }
        });
      }
    }, 1000);
  };

  render() {
    const { firstSimulator, region, destination, duration, location, address, price } = this.state;
    console.log("TOKOPOKO ",this.state)
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
            <Back onPress={this.handleBack}>
              <Image source={images.homescreen.arrowLeftBlack} style={{ width: 30, height: 25 }} />
            </Back>
            <Details />
          </Fragment>
        ) : (
            <Search onLocationSelected={this.handleLocationSelected} />
          )}

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