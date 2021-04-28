import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { useTheme } from '../../hooks'
import style from './style'
import { Mixins, Typography } from '../../styles'
import { GOOGLE_MAP_API_KEY } from '../../config'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, Callout } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'
import BottomPopup from './bottomPopup'

const EDGE_PADDING = {
    top: Mixins.scaleSize(50),
    right: Mixins.scaleSize(50),
    bottom: Mixins.scaleSize(50),
    left: Mixins.scaleSize(50)
}

const Body = ({ _this }) => {
    const [Colors, styles] = useTheme(style)
    const onMapReadyHandler = useCallback(() => {
        _this.map.current.fitToSuppliedMarkers(['source', 'destination'], { edgePadding: EDGE_PADDING, animated: true })
    }, [_this.map])

    return (
        <View style={styles.flex1}>
            <MapView
                style={styles.flex1}
                ref={_this.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                followsUserLocation={true}
                onMapReady={() => onMapReadyHandler()}
                loadingEnabled={true}
                showsCompass={false}
                //onUserLocationChange={_this.onUserLocationChange}
                rotateEnabled={false}
                //showsMyLocationButton={true}
                initialRegion={{ latitude: _this.rideDetails.source.coordinates[1], longitude: _this.rideDetails.source.coordinates[0], latitudeDelta: 0.02, longitudeDelta: 0.02, }}
            >
                <Marker
                    identifier='source'
                    coordinate={{ latitude: _this.rideDetails.source.coordinates[1], longitude: _this.rideDetails.source.coordinates[0] }}
                    title={'Pick up point'}
                >
                    <Icon name='ios-location-sharp' size={40} color={Colors.ascent} style={{ alignSelf: 'baseline' }} />
                </Marker>
                <Marker
                    identifier='destination'
                    coordinate={{ latitude: _this.rideDetails.destination.coordinates[1], longitude: _this.rideDetails.destination.coordinates[0] }}
                    title={'Drop off point'}
                >
                    <Icon name='ios-location-sharp' size={40} color={Colors.primary} style={{ alignSelf: 'baseline' }} />
                </Marker>
                <MapViewDirections
                    origin={{ latitude: _this.rideDetails.source.coordinates[1], longitude: _this.rideDetails.source.coordinates[0] }}
                    destination={{ latitude: _this.rideDetails.destination.coordinates[1], longitude: _this.rideDetails.destination.coordinates[0] }}
                    apikey={GOOGLE_MAP_API_KEY}
                    strokeWidth={4}
                    strokeColor={Colors.primary}
                    optimizeWaypoints={false}
                    mode="DRIVING"
                    onReady={result => {
                        //console.log(result.distance, result.duration)
                        //_this.setDriverDistanceTime({ distance: result.distance, duration: result.duration })
                    }}
                />
            </MapView>
            <View style={styles.navigationBar}>
                <TouchableOpacity onPress={() => _this.rideDetails.ride_status == 'accepted' ? _this.navigationMode({lat: _this.rideDetails.source.coordinates[1], lng: _this.rideDetails.source.coordinates[0]}) : _this.navigationMode({lat: _this.rideDetails.destination.coordinates[1], lng: _this.rideDetails.destination.coordinates[0]})} style={[styles.flexRow, styles.callChatButton, styles.marginBottom10, styles.marginTop10]}>
                    <View style={styles.callChatButtonIcon}>
                        <Icon2 name='directions' size={Typography.FONT_SIZE_25} color={Colors.primary} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => null} style={[styles.flexRow, styles.callChatButton]}>
                    <View style={styles.callChatButtonIcon}>
                        <Icon name='locate' size={Typography.FONT_SIZE_25} color={Colors.primary} />
                    </View>
                </TouchableOpacity>
            </View>
            <BottomPopup _this={_this} />
        </View>
    )
}

export default Body