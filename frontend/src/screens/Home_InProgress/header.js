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
import { HeaderBar } from '../../components'

const Header = ({ _this }) => {
    const [Colors, styles] = useTheme(style)
    return (
        <HeaderBar navigation={_this.navigation} >
            <Text style={styles.title}> Tow Progress </Text>
        </HeaderBar>
    )
}

export default Header


