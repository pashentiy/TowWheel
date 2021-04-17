import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { useTheme } from '../../hooks'
import style from './style'
import { Mixins, Typography } from '../../styles'
import Icon from 'react-native-vector-icons/Ionicons';
import { tow_bike, tow_truck, tow_private, avatarGif } from '../../assets'



const BottomPopup = ({ _this }) => {
    const [Colors, styles] = useTheme(style)

    return (
        <View style={styles.bottomPopup}>
            <View style={styles.curveHeader}>
            </View>
            { _this.popupStep == 0 ? <TowSelector _this={_this} /> : _this.popupStep == 1 ? <TowSearchProgress _this={_this} /> : null }
        </View>
    )
}


const TowSearchProgress = ({ _this }) => {
    const [Colors, styles] = useTheme(style)
    return (
        <View style={styles.content}>
            <View style={[styles.flex1,styles.centerAll]}>
                <Image source={avatarGif} style={styles.avatarGif} />
                <Text style={styles.popupTitle}>Connecting to Tow Drivers ..... </Text>
            </View>
            <TouchableOpacity onPress={()=>_this.setPopupStep(1)} style={[styles.marginBottom10, styles.flexRow, styles.continueButton]}>
                <Text style={styles.continueButtonText}>Cancel</Text>
                <View style={styles.continueButtonIcon}>
                    <Icon name='close' size={Typography.FONT_SIZE_25} color={Colors.primary} />
                </View>
            </TouchableOpacity>
        </View>
    )

}



const TowSelector = ({ _this }) => {
    const [Colors, styles] = useTheme(style)
    return (
        <View style={styles.content}>
            <Text style={styles.popupTitle}>Select Tow</Text>
            <View style={[styles.flexRow, styles.spaceBetween]}>
                <TouchableOpacity onPress={() => _this.setTowType('BIKE')} style={[styles.towImageContainer, (_this.towType == 'BIKE') ? styles.towImageContainerSelected : null]}>
                    <Image source={tow_bike} style={styles.towImage} />
                    <Text style={styles.towName}>Tow Bike</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => _this.setTowType('PRIVATE')} style={[styles.towImageContainer, (_this.towType == 'PRIVATE') ? styles.towImageContainerSelected : null]}>
                    <Image source={tow_private} style={styles.towImage} />
                    <Text style={styles.towName}>Tow Private</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => _this.setTowType('TRUCK')} style={[styles.towImageContainer, (_this.towType == 'TRUCK') ? styles.towImageContainerSelected : null]}>
                    <Image source={tow_truck} style={styles.towImage} />
                    <Text style={styles.towName}>Tow Truck/Bus</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.flex1, styles.marginTop10]}>
                <View style={[styles.flexRow, styles.alignCenter, styles.marginBottom5]}>
                    <Icon name='ios-location-sharp' size={Mixins.scaleSize(25)} color={Colors.ascent} />
                    <View>
                        <Text style={styles.locationTitle}>Pickup</Text>
                        <Text numberOfLines={1} style={styles.location}>{_this.pickupPoint}</Text>
                    </View>
                </View>
                <View style={[styles.flexRow, styles.alignCenter]}>
                    <Icon name='ios-location-sharp' size={Mixins.scaleSize(25)} color={Colors.primary} />
                    <View>
                        <Text style={styles.locationTitle}>Drop-off</Text>
                        <Text numberOfLines={1} style={styles.location}>{_this.destination.address}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={()=>_this.createRideRequest()} style={[styles.marginBottom10, styles.flexRow, styles.continueButton]}>
                <Text style={styles.continueButtonText}>Continue</Text>
                <View style={styles.continueButtonIcon}>
                    <Icon name='ios-arrow-forward-sharp' size={Typography.FONT_SIZE_25} color={Colors.primary} />
                </View>
            </TouchableOpacity>
        </View>
    )

}

export default BottomPopup