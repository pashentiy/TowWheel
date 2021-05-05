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
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, Callout } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'
import BottomPopup from './bottomPopup'
import { tow } from '../../assets'

const EDGE_PADDING = {
    top: Mixins.scaleSize(50),
    right: Mixins.scaleSize(50),
    bottom: Mixins.scaleSize(50),
    left: Mixins.scaleSize(50)
}

const Body = ({ _this }) => {
    const [Colors, styles] = useTheme(style)
    const onMapReadyHandler = useCallback(() => {
        _this.map.current.fitToSuppliedMarkers(['source', 'destination', 'driver'], { edgePadding: EDGE_PADDING, animated: true })
    }, [_this.map, _this.selectedDriver])

    return (
        <View style={styles.flex1}>
            <MapView
                style={styles.flex1}
                ref={_this.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={false}
                followsUserLocation={true}
                onMapReady={() => onMapReadyHandler()}
                loadingEnabled={true}
                showsCompass={false}
                //onUserLocationChange={_this.onUserLocationChange}
                rotateEnabled={false}
                //showsMyLocationButton={true}
                initialRegion={{ ..._this.source, latitudeDelta: 0.02, longitudeDelta: 0.02, }}
            >
                <Marker
                    identifier='source'
                    coordinate={{ latitude: _this.source.latitude, longitude: _this.source.longitude }}
                    title={'Pick up point'}
                >
                    <Icon name='ios-location-sharp' size={40} color={Colors.ascent} style={{ alignSelf: 'baseline' }} />
                </Marker>
                <Marker
                    identifier='destination'
                    coordinate={{ latitude: _this.destination.latitude, longitude: _this.destination.longitude }}
                    title={'Drop off point'}
                >
                    <Icon name='ios-location-sharp' size={40} color={Colors.primary} style={{ alignSelf: 'baseline' }} />
                </Marker>
                {_this.selectedDriver &&
                    <Marker
                        flat={true}
                        identifier='driver'
                        coordinate={{ latitude: _this.selectedDriver.location.coordinates[1], longitude: _this.selectedDriver.location.coordinates[0] }}
                        title={_this.selectedDriver.user_details.name}
                        style={{
                            transform: [{
                                rotate: _this.selectedDriver.location.heading === undefined ? '0deg' : `${_this.selectedDriver.location.heading}deg`
                            }]
                        }}
                    >
                        <View style={styles.marker}>
                            <Image source={tow} style={styles.markerImage} />
                        </View>
                    </Marker>
                }
                {_this.selectedDriver &&
                    <MapViewDirections
                        origin={{ latitude: _this.selectedDriver.location.coordinates[1], longitude: _this.selectedDriver.location.coordinates[0] }}
                        destination={{ latitude: _this.source.latitude, longitude: _this.source.longitude }}
                        apikey={GOOGLE_MAP_API_KEY}
                        strokeWidth={4}
                        strokeColor={Colors.ascent}
                        optimizeWaypoints={false}
                        onReady={result => {
                            _this.setDriverDistanceTime({ distance: result.distance, duration: result.duration })
                        }}
                    />
                }
                <MapViewDirections
                    origin={{ latitude: _this.source.latitude, longitude: _this.source.longitude }}
                    destination={{ latitude: _this.destination.latitude, longitude: _this.destination.longitude }}
                    apikey={GOOGLE_MAP_API_KEY}
                    strokeWidth={4}
                    strokeColor={Colors.primary}
                    optimizeWaypoints={false}
                    onReady={result => {
                        _this.setDistanceTime({ distance: result.distance, duration: result.duration })
                    }}
                />
            </MapView>
            <BottomPopup _this={_this} />
            {_this.selectedDriver &&
                <View style={styles.hireMeContainer}>
                    <TouchableOpacity onPress={()=> _this.setSelectedDriver(null)}>
                        <Text style={{ textAlign: "right", paddingRight: 5, paddingTop: 5 }}><Icon name='close' size={Typography.FONT_SIZE_18} color={Colors.black}></Icon></Text>
                    </TouchableOpacity>
                    <Text style={styles.hireMeText}><Icon name='location' size={Typography.FONT_SIZE_18} color={Colors.primary} /> {parseFloat(_this.driverDistanceTime.distance).toFixed(1)} km</Text>
                    <Text style={styles.hireMeText}><Icon name='time' size={Typography.FONT_SIZE_18} color={Colors.primary} /> {parseInt(_this.driverDistanceTime.duration / 60)} hr {parseInt(_this.driverDistanceTime.duration % 60)} min</Text>
                    <TouchableOpacity onPress={() => _this.hireMe()} style={[styles.flexRow, styles.continueButton, styles.hireMeButton]}>
                        <Text style={styles.continueButtonText}>Hire Me</Text>
                        <View style={styles.continueButtonIcon}>
                            <Icon name='ios-arrow-forward-sharp' size={Typography.FONT_SIZE_25} color={Colors.primary} />
                        </View>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default Body