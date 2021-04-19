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
import { avatarGif } from '../../assets'

const RideRequest = ({ _this }) => {
    const [Colors, styles] = useTheme(style)
    return (
        <View style={[styles.flex1, styles.centerAll, styles.content]}>
            <Image source={avatarGif} style={styles.avatarGif} />
            <Text style={styles.popupTitle}>Waiting for ride request ..... </Text>
        </View>
    )
}


export default RideRequest


