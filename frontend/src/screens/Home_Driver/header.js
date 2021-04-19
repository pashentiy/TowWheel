import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';
import style from './style'
import { Mixins, Typography } from '../../styles'
import Icon from 'react-native-vector-icons/Ionicons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAP_API_KEY } from '../../config'
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


