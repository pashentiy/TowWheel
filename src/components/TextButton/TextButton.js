import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { fonts } from '../../utilities';

const TextButton = ({ title, onPress, style }) => {
    const textStyle = StyleSheet.flatten([s.text, style])
    return (
        <TouchableOpacity
            activeOpacity={.75}
            onPress={onPress}
            style={s.container}>
            <Text style={textStyle}>{title}</Text>
        </TouchableOpacity>
    )
}

export default TextButton;

const s = StyleSheet.create({
    container: {
        margin: 0,
        padding: 0,
    },
    text: {
        fontFamily: fonts.Arial,
    }
});