import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import images from '../../utilities/images';

const ios = true;


export default class TowMarker extends React.Component {

    render() {
        return (
            <Marker
                coordinate={{
                    latitude: 31.750139,
                    longitude: 35.2372,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.0025,
                }}
                anchor={{ x: 0.35, y: 0.32 }}// centers towCar.png image
                ref={marker => { this.marker = marker }}
                style={{ width: 50, height: 50 }}
               
               
                // icon={require('../../assets/images/homescreen/towTruck.png')}
                >
                    <Image source={ios ? images.homescreen.markerBusyTowTruck : images.homescreen.markerFreeTowTruck} style={{height: 70, width:35 }} />
                {/* <Image source={require(images.homescreen.towTruck)} style={{ height: 35, width: 35 }} /> */}
            </Marker >
        )
    }
}