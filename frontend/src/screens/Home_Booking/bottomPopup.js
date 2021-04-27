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
            { _this.popupStep == 0 ? <TowSelector _this={_this} /> : _this.popupStep == 1 ? <TowSearchProgress _this={_this} /> : null}
        </View>
    )
}


const TowSearchProgress = ({ _this }) => {
    const [Colors, styles] = useTheme(style)

    const renderItem = ({ item, index }) => {
        let rating = 0
        for(let i = 0; i<item.reviews.length; i++){
            rating += item.reviews[i].rating
        }
        rating = parseFloat(rating / item.reviews.length || 0).toFixed(1)
        return (
            <TouchableWithoutFeedback onPress={()=>_this.setSelectedDriver(item)} >
            <View style={[styles.renderItem,(_this.selectedDriver && _this.selectedDriver._id)? styles.renderSelectedItem : null ]}>
                <Image source={{ uri: API_STORAGE + item.profile_picture }} style={styles.dp} />
                <Text style={styles.itemName}>{item.user_details.name}</Text>
                <Text style={styles.cost}><Text style={styles.currency}>$</Text> {parseFloat(item.vehicle_details.cost_per_km * _this.rideDetails.distance).toFixed(2)}</Text>
                <View style={styles.rating}>
                    <Icon2 name='star' size={Typography.FONT_SIZE_16} color={Colors.primary} />
                    <Text style={styles.ratingValue}> {rating}</Text>
                </View>
            </View>
            </TouchableWithoutFeedback>
        )
    }


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
                    <Icon2 name='toggle-on' size={Typography.FONT_SIZE_25} color={Colors.primary} />
                    <Text style={styles.distance}> Popularity</Text>
                </View>
            </View>

            {_this.rideDetails.available_drivers.length > 0 &&
                <>
                    <FlatList
                        //contentContainerStyle={styles.flatlist}
                        data={_this.rideDetails.available_drivers}
                        renderItem={renderItem}
                        style={[styles.fullWidth]}
                        ItemSeparatorComponent={null}
                        keyExtractor={(item, index) => index.toString()}
                        keyboardShouldPersistTaps='handled'
                        onEndReached={() => null}
                        refreshing={false}
                        onRefresh={() => null}
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={null}
                        ListHeaderComponent={null}
                    />
                </>
            }

            {_this.rideDetails.available_drivers.length < 1 && <View style={[styles.flex1, styles.centerAll]}>
                <Image source={avatarGif} style={styles.avatarGif} />
                <Text style={styles.popupTitle}>Connecting to Tow Drivers ..... </Text>
            </View>}

            <TouchableOpacity onPress={() => _this.cancelRideRequest()} style={[styles.marginBottom20, styles.flexRow, styles.continueButton]}>
                <Text style={styles.continueButtonText}>Cancel Request</Text>
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
                 <TouchableOpacity onPress={() => _this.setTowType('PRIVATE')} style={[styles.towImageContainer, (_this.towType == 'PRIVATE') ? styles.towImageContainerSelected : null]}>
                    <Image source={tow_private} style={styles.towImage} />
                    <Text style={styles.towName}>Tow Private</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => _this.setTowType('BIKE')} style={[styles.towImageContainer, (_this.towType == 'BIKE') ? styles.towImageContainerSelected : null]}>
                    <Image source={tow_bike} style={styles.towImage} />
                    <Text style={styles.towName}>Tow Bike</Text>
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
                        <Text numberOfLines={1} style={styles.location}>{_this.source.address}</Text>
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
            <TouchableOpacity onPress={() => _this.createRideRequest()} style={[styles.marginBottom20, styles.flexRow, styles.continueButton]}>
                <Text style={styles.continueButtonText}>Continue</Text>
                <View style={styles.continueButtonIcon}>
                    <Icon name='ios-arrow-forward-sharp' size={Typography.FONT_SIZE_25} color={Colors.primary} />
                </View>
            </TouchableOpacity>
        </View>
    )

}

export default BottomPopup