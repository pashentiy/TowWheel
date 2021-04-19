import React, { useState, useEffect, useRef } from 'react';
import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Config, { GOOGLE_MAP_API_KEY } from '../../config'
import { Container } from '../../components'
import Header from './header'
import { useDdux } from '../../hooks'
import Geocoder from 'react-native-geocoding';
Geocoder.init(GOOGLE_MAP_API_KEY);

var watchId = null

const RADIUS = 10000;
const latitudeDelta = 0.02
const longitudeDelta = 0.02


const Home = ({ navigation }) => {
    const Ddux = useDdux()
    const [permissionPopup, setPermissionPopup] = useState(false)
    const map = useRef(null)

    /*
     * Socket Handler
     */

    useEffect(() => {  
      requestLocationPermission()
    });

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
                    }
                )
            }
        } catch (err) {
            console.warn(err);
        }
    };

    return (
        <Container isTransparentStatusBar={true} style={styles.fullHeightContainer}>
            <Header _this={{ navigation }} />
            <Popup _this={{ permissionPopup, setPermissionPopup, requestLocationPermission }} />
        </Container>
    )
}

export default Home


