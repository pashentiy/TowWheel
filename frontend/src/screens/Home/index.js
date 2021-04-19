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
import { Container, Toast } from 'src/components'
import API from 'src/services/api'
import Header from './header'
import Body from './body'
import Popup from './popup'
import { useDdux, useTheme } from 'src/hooks'
import Geocoder from 'react-native-geocoding';
Geocoder.init(GOOGLE_MAP_API_KEY);

var watchId = null

const RADIUS = 10000;
const latitudeDelta = 0.02
const longitudeDelta = 0.02

const Home = ({ navigation }) => {
    const isFocused = useIsFocused()
    const Ddux = useDdux()
    const userDetails = Ddux.cache('user')
    const rideDetails = Ddux.cache('ride')
    const [Colors, styles] = useTheme(style)
    const [permissionPopup, setPermissionPopup] = useState(false)
    const [isMapLoaded, setIsMapLoaded] = useState(false)
    const [intervalState, setIntervalState] = useState(1)
    const [nearbyTows, setNearbyTows] = useState([])
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 31.767664,
        longitude: 35.216522,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    })
    const map = useRef(null)

    useEffect(() => {
        if (userDetails && Object.keys(userDetails).length !== 0) {
            getMyRideRequest()
        }
    }, [userDetails])

    useEffect(() => {
        if (isFocused && isMapLoaded) {
            requestLocationPermission()
        }

        if (!isFocused) {
            if (watchId)
                Geolocation.clearWatch(watchId);
        }
    }, [isFocused, isMapLoaded]);

    useEffect(() => {
        if (intervalState > 1)
            getNearestTows()
    }, [intervalState]);

    useEffect(() => {
        let interval = null
        if (isFocused) {
            interval = setInterval(() => {
                setIntervalState(prev => prev + 1)
            }, 60000);
        }
        if (!isFocused)
            clearInterval(interval);
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

    const getNearestTows = async (currentGeoLocation = null) => {
        /*
         * API GetNearestTows
         */
        const location = currentGeoLocation ? currentGeoLocation : currentLocation
        let response = await API.getNearestTows(location.latitude, location.longitude)
        if (!response.status) {
            return Toast.show({ type: 'error', message: response.error })
        }
        setNearbyTows(response.data)
    }

    const getMyRideRequest = async () => {
        /*
         * API getMyRideRequest
         */
        let response = await API.getMyRideRequest()
        if (!response.status) {
            return Toast.show({ type: 'error', message: response.error })
        }
        response = response.data
        if (response)
            Ddux.setCache('ride', {
                ...response,
                destination: { address: response.destination.address, latitude: response.destination.coordinates[1], longitude: response.destination.coordinates[0] },
                source: { address: response.source.address, latitude: response.source.coordinates[1], longitude: response.source.coordinates[0] }
            })
    }

    const onDestinationSet = async (destination) => {
        const data = {
            destination: { address: destination.address, latitude: destination.location.lat, longitude: destination.location.lng },
            source: { address: '', latitude: currentLocation.latitude, longitude: currentLocation.longitude }
        }

        if (userDetails && Object.keys(userDetails).length !== 0) {
            navigation.navigate('Home_Booking', data)
        }
        else {
            navigation.navigate('Login', data)
        }
    }

    const onLocationAvailable = (info = null) => {
        if (info) {
            const currentGeoLocation = { latitude: info.coords.latitude, longitude: info.coords.longitude, latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta }
            setCurrentLocation(currentGeoLocation)
            map.current.animateToRegion(currentGeoLocation, 1000);
        }
        if (watchId)
            Geolocation.clearWatch(watchId);
        watchId = Geolocation.watchPosition(
            pos => {
                if (map.current) {
                    const currentGeoLocation = { latitude: pos.coords.latitude, longitude: pos.coords.longitude, latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta }
                    setCurrentLocation(currentGeoLocation)
                    getNearestTows(currentGeoLocation)
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
            <Body _this={{ map, currentLocation, navigation, nearbyTows, setIsMapLoaded }} />
            <Popup _this={{ permissionPopup, setPermissionPopup, requestLocationPermission }} />
        </Container>
    )
}

export default Home


