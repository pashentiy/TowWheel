import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { fonts } from '../../utilities';

const CText = ({ children, style, ...props }) => {
    const textStyle = StyleSheet.flatten([s.text, style])
    return (
        <Text style={textStyle}>{children}</Text>
    )
}

const s = StyleSheet.create({
    text: {
        fontFamily: fonts.Arial,
    }
})

export default CText;