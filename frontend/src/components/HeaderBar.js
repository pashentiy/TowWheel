import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Mixins, Spacing, Typography } from 'src/styles'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'src/hooks'

const HeaderBar = ({ navigation, ...props }) => {
    const [Colors, styles] = useTheme(style)
    return (
        <View style={[styles.header,props.style]}>
            <TouchableOpacity onPress={() => navigation.pop()} style={[styles.navigationBack]}>
                <Icon name='angle-left' size={Typography.FONT_SIZE_25} color={Colors.primary} />
            </TouchableOpacity>
            <View style={[styles.flex1, styles.headerTitle]}>
                {props.children}
            </View>
        </View>
    )
}

export default HeaderBar


const style = ({Colors})=>(StyleSheet.create({
    header: {
        height: Mixins.scaleSize(46),
        width: '100%',
        backgroundColor: Colors.black,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerTitle: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    navigationBack:{
        marginLeft: Spacing.SCALE_10,
        marginRight: Spacing.SCALE_10,
        backgroundColor: Colors.secondary20,
        width: Mixins.scaleSize(30),
        height: Mixins.scaleSize(30),
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
);