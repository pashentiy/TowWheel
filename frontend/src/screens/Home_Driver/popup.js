import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import style from './style'
import { Mixins } from '../../styles'
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import Config from '../../config'
import { useTheme } from '../../hooks'

const Popup = ({ _this }) => {
    const [Colors, styles] = useTheme(style)
    return (
        <Modal
            isVisible={_this.permissionPopup}
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={800}
            backdropTransitionOutTiming={800}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Text style={styles.popupText}>All permissions are required. Please allow permissions. We respect your privacy.</Text>
                    <TouchableOpacity onPress={() => {
                        _this.setPermissionPopup(false)
                        setTimeout(()=>{
                        _this.requestLocationPermission()
                        },800)
                        }} style={styles.popupButton}>
                        <Text style={styles.popupButtonText}>Allow Permissions</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default Popup


