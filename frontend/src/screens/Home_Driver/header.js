import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import style from './style'
import { useTheme } from '../../hooks'
import { hamburger } from '../../assets'

const Header = ({ _this }) => {
    const [Colors, styles] = useTheme(style)
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => _this.navigation.toggleDrawer()}>
                <Image
                    style={styles.hamburger}
                    source={hamburger}
                />
            </TouchableOpacity>
        </View>
    )
}

export default Header


