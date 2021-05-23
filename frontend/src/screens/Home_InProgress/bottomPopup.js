import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
    TouchableWithoutFeedback,
    Alert
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
                    {/* <Image source={{ uri: API_STORAGE + item.profile_picture }} style={styles.dp} /> */}
                    <Icon name='person' size={Typography.FONT_SIZE_22} color={Colors.black} />
                    <View>
                        <Text style={styles.distance}>  {_this.driverVehicleDetails && _this.driverVehicleDetails.driver_details.name}</Text>
                        {
                            _this.nearestGarage.length > 0 && _this.rideDetails.ride_status == 'accepted' ?
                                <Text style={styles.distanceGrey}>  {`Tow arriving in ${parseInt(_this.arrivingIn)} min .....`}</Text>
                                : null
                        }
                    </View>
                </View>
                {_this.driverVehicleDetails && <View style={[styles.flexRow, styles.alignCenter]}>
                    <TouchableOpacity onPress={() => _this.callDriver()} style={[styles.flexRow, styles.callChatButton]}>
                        <View style={styles.callChatButtonIcon}>
                            <Icon name='ios-call' size={Typography.FONT_SIZE_25} color={Colors.primary} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {_this.setNewMessageCount(0); _this.navigation.navigate('Chat',{ name: _this.driverVehicleDetails.driver_details.name, partner_id: _this.driverVehicleDetails.driver_details._id, ride_id: _this.rideDetails._id })} } style={[styles.flexRow, styles.callChatButton]}>
                        <View style={styles.callChatButtonIcon}>
                            <Icon name='chatbubbles-sharp' size={Typography.FONT_SIZE_25} color={Colors.primary} />
                            {_this.newMessageCount > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{_this.newMessageCount}</Text></View>}
                        </View>
                    </TouchableOpacity>
                </View>}
            </View>

            <View style={[styles.flex1, styles.centerAll]}>
                {
                    _this.nearestGarage.length > 0 && _this.rideDetails.ride_status == 'accepted' ?
                        <GarageList _this={_this} />
                        :
                        <Text style={styles.popupTitle}>{_this.rideDetails.ride_status == 'accepted' ? `Tow arriving in ${parseInt(_this.arrivingIn)} min .....` : 'Tow ride started ...\n Please complete payment by cash.'} </Text>

                }

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


const GarageList = ({ _this }) => {
    const [Colors, styles] = useTheme(style)

    const confirmChange = (item) => {
        Alert.alert(
            "Change destination to selected Garage ?",
            `Would you like to change your initial drop-off point from ${_this.rideDetails.destination.address} to ${item.address}`,
            [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "OK", onPress: () => _this.changeDestination(item) }
            ],
            { cancelable: false }
        );
    }

    const renderItem = ({ item, index }) => {

        const rating = ()=>{
            let rateSum = 0
            for( const rate of item.rating){
                rateSum += rate
            }
            const averageRating = (rateSum/item.rating.length).toFixed(1)
            return averageRating
        }

        return (
            <TouchableWithoutFeedback onPress={() => confirmChange(item)} >
                <View style={styles.garageContainer}>
                    <Image source={{ uri: API_STORAGE + item.image }} style={styles.dp} />
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text numberOfLines={1} style={styles.address}> {item.address} </Text>
                    <View style={styles.rating}>
                        <Icon2 name='star' size={Typography.FONT_SIZE_16} color={Colors.primary} />
                        <Text style={styles.ratingValue}> {rating()}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <FlatList
            //contentContainerStyle={styles.flatlist}
            data={_this.nearestGarage}
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
    )
}


export default BottomPopup