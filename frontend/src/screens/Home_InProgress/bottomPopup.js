import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native';
import { useTheme } from '../../hooks'
import style from './style'
import { Mixins, Typography } from '../../styles'
import Config, { API_STORAGE } from '../../config'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { tow_bike, tow_truck, tow_private, avatarGif } from '../../assets'



const BottomPopup = ({ _this }) => {
    const [Colors, styles] = useTheme(style)

    return (
        <View style={styles.bottomPopup}>
            <View style={styles.curveHeader}>
            </View>
            <TowSearchProgress _this={_this} />
        </View>
    )
}


const TowSearchProgress = ({ _this }) => {
    const [Colors, styles] = useTheme(style)
    

    return _this.rideDetails && (
        <View style={styles.content}>

            <View style={[styles.flexRow, styles.alignCenter, styles.spaceBetween, styles.headerDistanceTime]}>
                <View style={[styles.flexRow, styles.alignCenter]}>
                    <Icon name='location' size={Typography.FONT_SIZE_22} color={Colors.black} />
                    <Text style={styles.distance}>{parseFloat(_this.rideDetails.distance).toFixed(1)} km</Text>
                </View>
                <View style={[styles.flexRow, styles.alignCenter]}>
                    <Icon name='time' size={Typography.FONT_SIZE_22} color={Colors.black} />
                    <Text style={styles.distance}>{parseFloat(_this.rideDetails.time / 60).toFixed(1)} hr</Text>
                </View>
                <View style={[styles.flexRow, styles.alignCenter]}>
                    <Icon2 name='usd' size={Typography.FONT_SIZE_20} color={Colors.black} />
                    <Text style={styles.distance}> {parseFloat(_this.rideDetails.payment_details.cost).toFixed(2)}</Text>
                </View>
            </View>

            <View style={[styles.flexRow, styles.alignCenter, styles.spaceBetween, styles.marginTop10]}>
                <View style={[styles.flexRow, styles.alignCenter]}>
                    <Icon name='person' size={Typography.FONT_SIZE_22} color={Colors.black} />
                    <Text style={styles.distance}>  {_this.driverVehicleDetails && _this.driverVehicleDetails.driver_details.name}</Text>
                </View>
                <View style={[styles.flexRow, styles.alignCenter]}>
                    <TouchableOpacity onPress={() => _this.callDriver()} style={[styles.flexRow, styles.callChatButton]}>
                        <View style={styles.callChatButtonIcon}>
                            <Icon name='ios-call' size={Typography.FONT_SIZE_25} color={Colors.primary} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => null} style={[styles.flexRow, styles.callChatButton]}>
                        <View style={styles.callChatButtonIcon}>
                            <Icon name='chatbubbles-sharp' size={Typography.FONT_SIZE_25} color={Colors.primary} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.flex1, styles.centerAll]}>
                <Text style={styles.popupTitle}>{_this.rideDetails.ride_status == 'accepted' ? `Tow arriving in ${parseInt(_this.arrivingIn)} min .....` : 'Tow ride started ...\n Please complete payment by cash.'} </Text>
            </View>

            {_this.rideDetails.ride_status == 'accepted' && <TouchableOpacity onPress={() => _this.cancelRideRequest()} style={[styles.marginBottom10, styles.flexRow, styles.continueButton]}>
                <Text style={styles.continueButtonText}>Cancel Request</Text>
                <View style={styles.continueButtonIcon}>
                    <Icon name='close' size={Typography.FONT_SIZE_25} color={Colors.primary} />
                </View>
            </TouchableOpacity>}
        </View>
    )

}


export default BottomPopup