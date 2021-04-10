import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Animated,
    StyleSheet,
    Easing,
    Dimensions,
    Text,
    Image
} from 'react-native';
import Modal from 'react-native-modal';
import { Mixins, Typography, Spacing } from 'src/styles'
import { useTheme } from 'src/hooks'

const InternetConnectionPopup = ({ isVisible }) => {
    const [Colors, styles] = useTheme(style)
    return (
        <Modal
            style={styles.modal}
            isVisible={isVisible}
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={800}
            backdropTransitionOutTiming={800}>
            <View style={styles.popup}>
                <Text style={styles.title}>Oops!</Text>
                <Text style={styles.subtitle}>Looks Like Internet Connection Broke Up With You.</Text>
                <Text style={styles.caption}>Check Your Connection And Try Again.</Text>
            </View>
        </Modal>
    );
}


const style = {
    modal: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 0
    },
    popup: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'Colors.primary',
        width: Mixins.DEVICE_WIDTH,
        height: Mixins.scaleSize(250),
        borderRadius: 10,
        padding: Spacing.SCALE_10
    },
    image:{
        resizeMode: 'contain',
        width: Mixins.scaleSize(100),
        height: Mixins.scaleSize(100),
    },
    title: {
        fontWeight: 'bold',
        fontSize: Typography.FONT_SIZE_20,
        color: 'Colors.white',
    },
    subtitle: {
        color: 'Colors.white',
        fontSize: Typography.FONT_SIZE_14,
    },
    caption: {
        color: 'Colors.primary',
        fontSize: Typography.FONT_SIZE_14,
        marginTop: Spacing.SCALE_10,
    },
};

export default InternetConnectionPopup



