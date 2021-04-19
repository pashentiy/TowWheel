import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import style from './style'
import { useTheme } from '../..hooks'
import { avatarGif } from '../..assets'

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


