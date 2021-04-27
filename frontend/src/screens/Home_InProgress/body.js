import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Platform,
    Animated,
    Easing
} from 'react-native';
import { useTheme } from '../../hooks'
import style from './style'
import { Mixins, Typography } from '../../styles'
import BottomPopup from './bottomPopup'

console.disableYellowBox = true;

const EDGE_PADDING = {
    top: Mixins.scaleSize(50),
    right: Mixins.scaleSize(50),
    bottom: Mixins.scaleSize(50),
    left: Mixins.scaleSize(50)
}

var movedToRegion = false

const Body = ({ _this }) => {

    return (
        <View style={styles.flex1}>
            <BottomPopup _this={_this} />
        </View>
    )
}

export default Body

/*
coordinate={{ latitude: _this.driverVehicleDetails.driver_details.location.coordinates[1], longitude: _this.driverVehicleDetails.driver_details.location.coordinates[0] }}
_this.driverVehicleDetails.driver_details.location.heading === undefined ? '0deg' : `${_this.driverVehicleDetails.driver_details.location.heading + 270}deg`
*/