import React from 'react';
import { Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { colors, fonts } from '../../utilities';

const Button = ({ title, disabled, icon, onPress, colors = ['#FC595B', '#CE485F'], textStyle, style }) => {
    const _textStyle = StyleSheet.flatten([
        s.text,
        textStyle
    ]);
    const _linearGradientStyle = StyleSheet.flatten([
        s.linearGradient,
        style
    ])
    return (
        <TouchableOpacity
            activeOpacity={.75}
            disabled={disabled}
            onPress={onPress}
        >
            <LinearGradient
                colors={colors}
                start={{ x: 0.5, y: 0.3 }}
                style={_linearGradientStyle}>
                {icon && <Image source={icon} style={s.icon} resizeMode='contain' />}
                <Text style={_textStyle}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default Button;

const s = StyleSheet.create({
    text: {
        color: colors.$white,
        fontSize: 17,
        fontFamily: fonts.Arial,
    },
    linearGradient: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 11,
        borderRadius: 5
    },
    icon: {
        position: 'absolute',
        left: 15,
        width: 17,
        height: 17
    }
});