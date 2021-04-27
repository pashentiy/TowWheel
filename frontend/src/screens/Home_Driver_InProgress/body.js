import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import style from './style'
import BottomPopup from './bottomPopup'

const EDGE_PADDING = {
    top: Mixins.scaleSize(50),
    right: Mixins.scaleSize(50),
    bottom: Mixins.scaleSize(50),
    left: Mixins.scaleSize(50)
}

const Body = ({ _this }) => {

    return (
        <View style={styles.flex1}>
            <BottomPopup _this={_this} />
        </View>
        
    )
}

export default Body