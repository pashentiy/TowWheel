import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import style from './style'
import { Mixins } from '../../styles'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../../hooks'
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, Callout } from 'react-native-maps';

const Body = ({ _this }) => {
    const [Colors, styles] = useTheme(style)
    return (
        <View style={styles.flex1}>
            <MapView
                style={styles.flex1}
                //ref={_this.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                followsUserLocation={true}
                onMapReady={() => null}
                loadingEnabled={true}
                initialRegion={{
                    latitude: 31.766905,
                    longitude: 35.215293,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
            >
                
            </MapView>
        </View>
    )
}

export default Body


