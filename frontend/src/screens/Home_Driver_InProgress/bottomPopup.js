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
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';



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
                    <Icon name='location' size={Typography.FONT_SIZE_22} color={Colors.primary} />
                    <Text style={styles.distance}>{parseFloat(_this.rideDetails.distance).toFixed(1)} km</Text>
                </View>
                <View style={[styles.flexRow, styles.alignCenter]}>
                    <Icon name='time' size={Typography.FONT_SIZE_22} color={Colors.primary} />
                    <Text style={styles.distance}>{parseInt(_this.rideDetails.time / 60)} hr {parseInt(_this.rideDetails.time % 60)} min</Text>
                </View>
                <View style={[styles.flexRow, styles.alignCenter]}>
                    <Icon2 name='usd' size={Typography.FONT_SIZE_20} color={Colors.primary} />
                    <Text style={styles.distance}> {parseFloat(_this.rideDetails.payment_details.cost).toFixed(2)}</Text>
                </View>
            </View>

            <View style={[styles.flexRow, styles.alignCenter, styles.spaceBetween, styles.marginTop10]}>
                <View style={[styles.flexRow, styles.alignCenter]}>
                    <Icon name='person' size={Typography.FONT_SIZE_22} color={Colors.black} />
                    <Text style={styles.distance}> {_this.rideDetails.user.name}</Text>
                </View>
                <View style={[styles.flexRow, styles.alignCenter]}>
                    <TouchableOpacity onPress={() => _this.callUser()} style={[styles.flexRow, styles.callChatButton]}>
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

            <View style={[styles.flex1, styles.marginTop10]}>
                <View style={[styles.flexRow, styles.alignCenter, styles.marginBottom5]}>
                    <Icon name='ios-location-sharp' size={Mixins.scaleSize(25)} color={Colors.ascent} />
                    <View>
                        <Text style={styles.locationTitle}>Pickup</Text>
                        <Text numberOfLines={1} style={styles.location}>{_this.rideDetails.source.address}</Text>
                    </View>
                </View>
                <View style={[styles.flexRow, styles.alignCenter]}>
                    <Icon name='ios-location-sharp' size={Mixins.scaleSize(25)} color={Colors.primary} />
                    <View>
                        <Text style={styles.locationTitle}>Drop-off</Text>
                        <Text numberOfLines={1} style={styles.location}>{_this.rideDetails.destination.address}</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity onPress={() => _this.rideDetails.ride_status == 'accepted' ? _this.startTowRide() : _this.completeTowRide() } style={[styles.marginBottom10, styles.flexRow, styles.continueButton]}>
                <Text style={styles.continueButtonText}>{_this.rideDetails.ride_status == 'accepted' ? 'Start Tow Ride': 'Ride & Payment Completed'}</Text>
                <View style={styles.continueButtonIcon}>
                    <Icon name='ios-arrow-forward-sharp' size={Typography.FONT_SIZE_25} color={Colors.primary} />
                </View>
            </TouchableOpacity>
        </View>
    )

}


export default BottomPopup