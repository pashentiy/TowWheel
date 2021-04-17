import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { useTheme } from '../../hooks'
import style from './style'

const BottomPopup = ({ _this }) => {
    const [Colors, styles] = useTheme(style)

    return (
        <View style={styles.bottomPopup}>
            <View style={styles.curveHeader}>
                <Text> BottomPopup </Text>
            </View>
        </View>
    )
}


export default BottomPopup