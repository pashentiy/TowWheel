import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    TouchableWithoutFeedback,
    TouchableNativeFeedback
} from 'react-native';
import style from './style'
import { Mixins, Typography } from '../../styles'
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../hooks'
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, Callout } from 'react-native-maps';
import { tow_bike, tow_truck, tow_private, avatarGif } from '../../assets'

const Body = ({ _this }) => {
    const [Colors, styles] = useTheme(style)

    const isRideAccepted = _this.selectedRideRequest && _this.selectedRideRequest.available_drivers.includes(_this.userDetails.driver_details) ? true : false

    const renderItem = ({ item, index }) => {
        return <RideRequest _this={_this} item={item} />
    }

    const renderSeperator = () => {
        return (
            <View style={{ height: Mixins.scaleHeight(10) }} />
        )
    }

    return (
        <>
            <View style={styles.map}>
                <MapView
                    style={styles.flex1}
                    ref={_this.map}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    onMapReady={() => _this.setIsMapLoaded(true)}
                    loadingEnabled={true}
                    showsCompass={false}
                    //onUserLocationChange={_this.onUserLocationChange}
                    rotateEnabled={false}
                    //showsMyLocationButton={true}
                    initialRegion={_this.currentLocation}
                >
                </MapView>
            </View>
            <View style={[styles.flex1, styles.centerAll, styles.content]}>
                {_this.rideRequests.length > 0 && (
                    <>
                        <FlatList
                            contentContainerStyle={styles.flatlist}
                            data={_this.rideRequests}
                            renderItem={renderItem}
                            style={[styles.fullWidth]}
                            ItemSeparatorComponent={renderSeperator}
                            keyExtractor={(item, index) => index.toString()}
                            keyboardShouldPersistTaps='handled'
                            onEndReached={() => null}
                            refreshing={false}
                            onRefresh={() => null}
                            inverted={false}
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={null}
                            ListHeaderComponent={null}
                        />
                        {_this.selectedRideRequest && 
                        <TouchableOpacity onPress={() => _this.processTowRequest()} style={[styles.marginBottom10, styles.flexRow, styles.continueButton]}>
                            <Text style={styles.continueButtonText}>{isRideAccepted ? 'Decline Tow Request' : 'Accept Tow Request'}</Text>
                            <View style={styles.continueButtonIcon}>
                                <Icon name='ios-arrow-forward-sharp' size={Typography.FONT_SIZE_25} color={Colors.primary} />
                            </View>
                        </TouchableOpacity>
                        }
                    </>
                )
                }
                {_this.rideRequests.length < 1 && <>
                    <Image source={avatarGif} style={styles.avatarGif} />
                    <Text style={styles.popupTitle}>Waiting for ride request ..... </Text>
                </>}
            </View>
        </>
    )
}


const RideRequest = ({ _this, item }) => {
    const [Colors, styles] = useTheme(style)
    const icon = item.required_vehicle_type == 'BIKE' ? tow_bike : item.required_vehicle_type == 'TRUCK' ? tow_truck : tow_private
    return (
        <TouchableOpacity onPress={() => _this.setSelectedRideRequest(item)}>
            <View style={[styles.paddingHorizontal10, styles.paddingVertical10, (_this.selectedRideRequest && item._id == _this.selectedRideRequest._id) ? styles.selected : null]}>
                <View style={[styles.flexRow, styles.flex1, styles.centerAll]}>
                    <View style={styles.centerAll}>
                        <Image source={icon} style={styles.towImage} />
                        <Text style={styles.vehicleName}>{item.required_vehicle_type}</Text>
                    </View>
                    <View style={[styles.flex1, styles.paddingLeft10]}>
                        <View style={[styles.flexRow, styles.alignCenter, styles.marginBottom5]}>
                            <Icon name='ios-location-sharp' size={Mixins.scaleSize(20)} color={Colors.ascent} />
                            <View>
                                <Text style={styles.locationTitle}>Pickup</Text>
                                <Text numberOfLines={1} style={styles.location}>{item.source.address}</Text>
                            </View>
                        </View>
                        <View style={[styles.flexRow, styles.alignCenter]}>
                            <Icon name='ios-location-sharp' size={Mixins.scaleSize(20)} color={Colors.primary} />
                            <View>
                                <Text style={styles.locationTitle}>Drop-off</Text>
                                <Text numberOfLines={1} style={styles.location}>{item.destination.address}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.centerAll}>
                        <Text style={styles.value}>{parseFloat(item.distance).toFixed(1)}<Text style={styles.symbol}> km</Text></Text>
                        <Text style={styles.value}><Text style={styles.symbol}>$ </Text>{parseFloat(220.00).toFixed(2)}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Body


