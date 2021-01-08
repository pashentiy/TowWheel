import React from 'react';
import { Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const OTopImage = (props) => {
    const imageStyle = StyleSheet.flatten([
        s.image,
        props.style
    ]);
    return (
        <Image
            source={props.source}
            style={imageStyle}
            resizeMode={props.resizeMode || 'contain'}
        />
    )
}

OTopImage.propTypes = {
    source: PropTypes.number.isRequired,
    resizeMode: PropTypes.string,
    style: PropTypes.object
}

export default OTopImage;

const s = StyleSheet.create({
    image: {
        width: 200,
        height: 150,
        marginTop: 5,
        top: 20,
        alignSelf: 'center'
    }
})