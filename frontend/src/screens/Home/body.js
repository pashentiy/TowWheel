import React from 'react';
import {
    View,
    Image
} from 'react-native';
import style from './style'
import { useTheme } from '../../hooks'
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, Callout } from 'react-native-maps';
import { tow_bike, tow_truck, tow_private } from '../../assets'

const Body = ({ _this }) => {
    const [Colors, styles] = useTheme(style)
    return (
        <View style={styles.flex1}>
            <MapView
                style={styles.flex1}
                ref={_this.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                followsUserLocation={true}
                onMapReady={() => _this.setIsMapLoaded(true)}
                loadingEnabled={true}
                showsCompass={false}
                //onUserLocationChange={_this.onUserLocationChange}
                rotateEnabled={false}
                //showsMyLocationButton={true}
                initialRegion={_this.currentLocation}
            >
                {
                    _this.nearbyTows.map(item => <MarkerRender key={item._id} item={item} />)
                }
            </MapView>
        </View>
    )
}

const MarkerRender = ({ item }) => {
    const [Colors, styles] = useTheme(style)
    const title = item.active_vehicle.type == 'BIKE' ? 'Tow Bike' : item.active_vehicle.type == 'TRUCK' ? 'Tow Truck/Bus' : 'Tow Private'
    const icon = item.active_vehicle.type == 'BIKE' ? tow_bike : item.active_vehicle.type == 'TRUCK' ? tow_truck : tow_private
    return (
        <Marker
            flat={true}
            title={title}
            coordinate={{ latitude: item.location.coordinates[1], longitude: item.location.coordinates[0] }}
            style={{
                transform: [{
                    rotate: item.location.heading === undefined ? '0deg' : `${item.location.heading}deg`
                }]
            }}
        >
            <View style={styles.marker}>
                <Image source={icon} style={styles.markerImage} />
            </View>
        </Marker>
    )
}

export default Body


