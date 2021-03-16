import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import images from '../../utilities/images';

const ios = true;


export default class TowMarker extends React.Component {
    state = {
        latitude: 31.753286,
        longitude: 35.231884
    }

    componentDidMount() {

        setTimeout(() => {
        setTimeout(() => {
            this.setState({ longitude: this.state.longitude + 0.001 });
        }, 1000);
        setTimeout(() => {
            this.setState({ longitude: this.state.longitude + 0.001 });
        }, 2000);
        setTimeout(() => {
            this.setState({ longitude: this.state.longitude + 0.001 });
        }, 3000);
        setTimeout(() => {
            this.setState({ longitude: this.state.longitude + 0.0007 });
        }, 4000);
        setTimeout(() => {
            this.setState({ latitude: 31.752465, longitude: 35.236093 });
        }, 5000);
        setTimeout(() => {
            this.setState({ latitude: 31.751840, longitude: 35.236620 });
        }, 6000);
        setTimeout(() => {
            this.setState({ latitude: 31.750603, longitude: 35.237191 });
        }, 7000);
    }, 72000);
    };  
        
        

    render() {
        return (
            <Marker
                coordinate={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
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