import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native';
import style from './style'
import { Mixins, Typography } from '../../styles'
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../hooks'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { tow_bike, tow_truck, tow_private, avatarGif } from '../../assets'

const Body = ({ _this }) => {
    const [Colors, styles] = useTheme(style)

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
                            style={[styles.fullWidth]}
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
                            <Text> 'Decline Tow Request or Accept Tow Request' </Text>
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

export default Body


