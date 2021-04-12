import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';
import style from './style'
import { Mixins } from '../../styles'
import Icon from 'react-native-vector-icons/FontAwesome';
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
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    onChangeText={(text) => null}
                    value={''}
                    placeholder="Destination Place ..."
                    placeholderTextColor={Colors.muted_text}
                />
            </View>
        </View>
    )
}

export default Header


