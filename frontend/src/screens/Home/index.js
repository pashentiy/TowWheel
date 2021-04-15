import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    View,
    Image,
    Text,
    Animated,
    Easing,
    PermissionsAndroid,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import style from './style'
import Geolocation from 'react-native-geolocation-service';
import Config, { GOOGLE_MAP_API_KEY } from 'src/config'
import { Container, Toast } from '../../components'
import API from '../../services/api'
import Header from './header'
import Body from './body'
import Popup from './popup'
import { useDdux, useTheme } from '../../hooks'
import Geocoder from 'react-native-geocoding';
Geocoder.init(GOOGLE_MAP_API_KEY);


var watchId = null

const RADIUS = 10000;
const latitudeDelta = 0.02
const longitudeDelta = 0.02

var isInitialized = false

const Home = ({ navigation }) => {
    const isFocused = useIsFocused()
    const Ddux = useDdux()
    const userDetails = Ddux.cache('user')
    const rideDetails = Ddux.cache('ride')
    const [Colors, styles] = useTheme(style)
    const [permissionPopup, setPermissionPopup] = useState(false)
    const [nearbyTows, setNearbyTows] = useState([])
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 31.767664,
        longitude: 35.216522,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    })
    const map = useRef(null)


    useEffect(() => {
        if (isFocused && isInitialized) {
            Geolocation.getCurrentPosition(
                pos => {
                    if (map.current) {
                        const currentGeoLocation = { latitude: pos.coords.latitude, longitude: pos.coords.longitude, latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta }
                        setCurrentLocation(currentGeoLocation)
                        map.current.animateToRegion(currentGeoLocation, 1000);
                        getNearestTows(currentGeoLocation)
                    }
                },
                error => {
                    console.log('request permission ==>>', error)
                }
            )
        }

        return (() => {
            if (watchId)
                Geolocation.clearWatch(watchId);
        })
    }, [isFocused]);


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

    const getNearestTows = async (location) => {
        /*
         * API GetNearestTows
         */
        let response = await API.getNearestTows(location.latitude, location.longitude)
        if (!response.status) {
            return Toast.show({ type: 'error', message: response.error })
        }
        setNearbyTows(response.data)
    }

    const onDestinationSet = async (destination) => {
        if (userDetails && Object.keys(userDetails).length !== 0) {
            navigation.navigate('Home_Booking', { destination: destination, source: currentLocation })
        }
        else {
            navigation.navigate('Login', { destination: destination, source: currentLocation })
        }
    }

    const onLocationAvailable = (info=null) => {
        if(info){
            const currentGeoLocation = { latitude: info.coords.latitude, longitude: info.coords.longitude, latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta }
                        setCurrentLocation(currentGeoLocation)
                        map.current.animateToRegion(currentGeoLocation, 1000);
                        getNearestTows(currentGeoLocation)
        }
        if (watchId)
            Geolocation.clearWatch(watchId);
        watchId = Geolocation.watchPosition(
            pos => {
                if (map.current) {
                    const currentGeoLocation = { latitude: pos.coords.latitude, longitude: pos.coords.longitude, latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta }
                    setCurrentLocation(currentGeoLocation)
                    if (!isInitialized) {
                        isInitialized = true
                        getNearestTows(currentGeoLocation)
                        map.current.animateToRegion(currentGeoLocation, 1000);
                    }
                }
            },
            e => {
                console.log('watchId Error => ', e)
            },
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
                useSignificantChanges: true,
                distanceFilter: 500, //500m
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
                onLocationAvailable()
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

    return (
        <Container isTransparentStatusBar={true} style={styles.fullHeightContainer}>
            <Header _this={{ navigation, onDestinationSet, rideDetails }} />
            <Body _this={{ map, currentLocation, navigation, requestLocationPermission, nearbyTows }} />
            <Popup _this={{ permissionPopup, setPermissionPopup, requestLocationPermission }} />
        </Container>
    )
}

export default Home


