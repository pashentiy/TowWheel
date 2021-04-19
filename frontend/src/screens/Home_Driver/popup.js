import React from 'react';
import {
    View,
    Text
} from 'react-native';
import style from './style'
import Modal from 'react-native-modal';
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
                </View>
            </View>
        </Modal>
    )
}

export default Popup


