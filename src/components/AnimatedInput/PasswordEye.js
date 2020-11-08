import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

import { images } from '../../utilities';

const { openEye, closedEye } = images.login;

const PasswordEye = ({ textIsVisible, setTextVisible }) => {
    const handlePress = () => {
        setTextVisible(!textIsVisible);
    }

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={s.container}
            activeOpacity={0.5}
        >
            <Image
                source={textIsVisible ? openEye : closedEye}
                resizeMode='cover'
                style={s.image}
            />
        </TouchableOpacity>
    )
}

export default PasswordEye;

const s = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        padding: 5
    },
    image: {
        width: 15,
        height: 15
    }
});