import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    View,
    Image,
    Text,
    Animated,
    Easing,
    SafeAreaView,
    PermissionsAndroid,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import style from './style'
import Geolocation from 'react-native-geolocation-service';
import Config, { GOOGLE_MAP_API_KEY } from '../../config'
import { Container, Toast } from '../../components'
import API from '../../services/api'
import Header from './header'
import Body from './body'
import Popup from './popup'
import { useDdux, useTheme } from '../../hooks'
import Geocoder from 'react-native-geocoding';
Geocoder.init(GOOGLE_MAP_API_KEY);

var socket = null
var watchId = null

const RADIUS = 10000;
const latitudeDelta = 0.02
const longitudeDelta = 0.02


const Home = ({ navigation }) => {
    const isFocused = useIsFocused()
    const Ddux = useDdux()
    const userDetails = Ddux.cache('user')
    const [Colors, styles] = useTheme(style)
    const [permissionPopup, setPermissionPopup] = useState(false)
    const [rideRequests, setRideRequests] = useState([])
    const [selectedRideRequest, setSelectedRideRequest] = useState(null)
    const [isActiveRideExists, setIsActiveRideExists] = useState(null)
    const [isMapLoaded, setIsMapLoaded] = useState(false)
    const [vehiclesData, setVehiclesData] = useState(null)
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 31.767664,
        longitude: 35.216522,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    })
    const map = useRef(null)

    /*
     * Socket Handler
     */
    const socketHandler = async (currentLocation) => {
        socket = await API.SOCKET('/driver-ride-request')
        socket.on('connect', () => {
            socket.emit('initialize', { _id: userDetails.driver_details, location: currentLocation }, (response) => {
                console.log("response!!!!! ", response.vehicles_data)
                setVehiclesData(response.vehicles_data)
                setIsActiveRideExists(response.active_ride)
                setSelectedRideRequest(null)
                setRideRequests(prev => response.nearest_ride_requests)
            })
        });

        socket.on('new_booking_update', (response) => {
            socket.emit('initialize', { _id: userDetails.driver_details, location: currentLocation }, (response) => {
                setSelectedRideRequest(null)
                setIsActiveRideExists(response.active_ride)
                setRideRequests(prev => response.nearest_ride_requests)
            })
        })

        socket.on('disconnect', () => {

        });
    }

    const getVehicleCost = (type,distance)=>{
        let vehicles = vehiclesData
        console.log("-----------", vehicles)
        let result = vehicles.filter(item => item.type == type);
        result.sort((a, b) => (a.cost_per_km > b.cost_per_km) ? 1 : -1)

        return (result[0].cost_per_km * distance).toFixed(2)
    }

    const processTowRequest = async () => {
        if (selectedRideRequest.available_drivers.includes(userDetails.driver_details)) {
            socket.emit('decline_tow_request', { ride_id: selectedRideRequest._id, driver_id: userDetails.driver_details }, (response) => {
                if (response) {
                    setRideRequests(prev => {
                        return prev.map(item => {
                            if (item._id == selectedRideRequest._id) {
                                item.available_drivers = item.available_drivers.filter(driver => driver !== userDetails.driver_details)
                            }
                            setSelectedRideRequest(prev => item)
                            return item
                        })
                    })
                }
            });
        }
        else {
            // Accept Tow Request
            socket.emit('accept_tow_request', { ride_id: selectedRideRequest._id, driver_id: userDetails.driver_details }, (response) => {
                if (response) {
                    setRideRequests(prev => {
                        return prev.map(item => {
                            if (item._id == selectedRideRequest._id) {
                                item.available_drivers.push(userDetails.driver_details)
                            }
                            setSelectedRideRequest(prev => item)
                            return item
                        })
                    })
                }
            });
        }
    }


    useEffect(() => {
        if (isFocused && isMapLoaded) {
            setIsActiveRideExists(null)
            requestLocationPermission()
        }

        if (!isFocused) {
            if (socket)
                socket.close();
            if (watchId)
                Geolocation.clearWatch(watchId);
        }
    }, [isFocused, isMapLoaded]);

    const requestLocationPermission = () => {
        try {
            if (Config.isAndroid)
                requestPermissionsAndroid()
            else
                requestPermissionsIOS()
        }
        catch (e) {
            console.log(e)
        }
    }

    const onLocationAvailable = (info = null) => {
        if (info) {
            const currentGeoLocation = { latitude: info.coords.latitude, longitude: info.coords.longitude, latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta }
            setCurrentLocation(currentGeoLocation)
            map.current.animateToRegion(currentGeoLocation, 1000);
            socketHandler(currentGeoLocation)
        }
        if (watchId)
            Geolocation.clearWatch(watchId);
        watchId = Geolocation.watchPosition(
            pos => {
                if (map.current) {
                    const currentGeoLocation = { latitude: pos.coords.latitude, longitude: pos.coords.longitude, latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta }
                    setCurrentLocation(currentGeoLocation)
                }
            },
            e => {
                console.log('watchId Error => ', e)
            },
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
                //useSignificantChanges: true,
                //distanceFilter: 500, //500m
            }
        )
    }

    const requestPermissionsAndroid = async () => {
        try {
            let granted = true
            let permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
            if (permission !== PermissionsAndroid.RESULTS.GRANTED)
                granted = false
            permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            if (permission !== PermissionsAndroid.RESULTS.GRANTED)
                granted = false

            if (!granted)
                setPermissionPopup(true)
            else {
                Geolocation.getCurrentPosition(
                    info => { onLocationAvailable(info) },
                    error => {
                        console.log('request permission ==>>', error)
                        setPermissionPopup(true)
                    }
                )
            }

        } catch (err) {
            console.warn(err);
        }
    };

    const requestPermissionsIOS = async () => {
        try {
            let granted = true
            let always = await Geolocation.requestAuthorization('always')
            let whenInUse = await Geolocation.requestAuthorization('whenInUse')
            if (always !== 'granted' && whenInUse !== 'granted')
                granted = false

            if (!granted)
                setPermissionPopup(true)
            else {
                Geolocation.getCurrentPosition(
                    info => { onLocationAvailable(info) },
                    error => {
                        console.log('request permission ==>>', error)
                        setPermissionPopup(true)
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                )
            }
        } catch (err) {
            console.warn(err);
        }
    };

    return (
        <Container isTransparentStatusBar={true} style={styles.fullHeightContainer}>
            <SafeAreaView style={[styles.flex1]}>
                <Header _this={{ navigation }} />
                <Body _this={{ map, currentLocation, navigation, setIsMapLoaded, rideRequests, getVehicleCost, selectedRideRequest, setSelectedRideRequest, processTowRequest, userDetails, isActiveRideExists }} />
                <Popup _this={{ permissionPopup, setPermissionPopup, requestLocationPermission }} />
            </SafeAreaView>
        </Container>
    )
}

export default Home


