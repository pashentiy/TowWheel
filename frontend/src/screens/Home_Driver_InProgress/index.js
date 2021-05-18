import React, { useState, useEffect, useRef, useReducer } from 'react';
import {
  View,
  Text,
  BackHandler,
  Platform,
  Linking
} from 'react-native';
import styles from './style'
import Config from '../../config'
import { useIsFocused } from '@react-navigation/native';
import { Container, Toast } from '../../components'
import Geolocation from 'react-native-geolocation-service';
import { Mixins, Spacing, Typography } from '../../styles'
import API from '../../services/api'
import { useDdux } from '../../hooks'
import Body from './body'
import Header from './header'

var socket = null
var watchId = null

const InProgress = ({ route, navigation }) => {
  const { ride_details = null } = route.params
  const isFocused = useIsFocused()
  const Ddux = useDdux()
  const userDetails = Ddux.cache('user')
  const [rideDetails, setRideDetails] = useState(ride_details)
  const map = useRef(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [newMessageCount, setNewMessageCount] = useState(0)
  const [, forceRender] = useReducer(x => x + 1, 0);


  useEffect(() => {
    socketHandler()
    onLocationChange()

    return () => {
      if (socket)
        socket.close();
      if (watchId)
        Geolocation.clearWatch(watchId);
    }
  }, []);

  useEffect(() => {
    if (socket)
      socket.emit('update_driver_location', { driver_id: rideDetails.assigned_driver, location: currentLocation })
  }, [currentLocation])

  /*
   * Socket Handler
   */
  const socketHandler = async () => {
    socket = await API.SOCKET('/user-driver-inprogress')
    socket.on('connect', () => {
      socket.emit('initialize_driver', { ride_id: rideDetails._id }, (response) => {
        setNewMessageCount(response.unread_chat_count)
        setRideDetails(prev => response)
      })
    });

    socket.on('cancel_ride_request', (response) => {
      navigation.pop()
    })

    socket.on('new_message', (data) => {
      if(data.sender !== userDetails._id){
      setNewMessageCount(prev=>prev+1)
      Toast.show({ type: 'info', message: 'New Message : '+data.message })
      }
    })

    socket.on('disconnect', () => {

    });
  }

  const startTowRide = async () => {
    socket.emit('start_tow_ride', { ride_id: rideDetails._id }, (response) => {
      setRideDetails(prev => ({ ...prev, ride_status: 'started' }))
    })
  }

  const completeTowRide = async () => {
    socket.emit('complete_ride', { ride_id: rideDetails._id }, (response) => {
      // TODO : Add option for user to leave review and feedback for driver.
      navigation.pop()
    })
  }

  const onLocationChange = () => {

    Geolocation.getCurrentPosition(
      pos => { setCurrentLocation({ heading: pos.coords.heading, latitude: pos.coords.latitude, longitude: pos.coords.longitude }) },
      error => {
        console.log('request permission ==>>', error)
        setPermissionPopup(true)
      }
    )


    if (watchId)
      Geolocation.clearWatch(watchId);
    watchId = Geolocation.watchPosition(
      pos => {
        // Catch mocked data only for debugging
        //if (pos.mocked) {
        //console.log(pos)
        setCurrentLocation({ heading: pos.coords.heading, latitude: pos.coords.latitude, longitude: pos.coords.longitude })
        //}
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

  const callUser = () => {
    let phoneNumber = `tel:+${rideDetails.user.mobile}`
    Linking.openURL(phoneNumber);
  };

  const navigationMode = ({ lat, lng }) => {
    const scheme = Platform.select({ ios: `https://www.waze.com/ul?ll=${lat}%2C${lng}&navigate=yes&zoom=17`, android: `https://www.waze.com/ul?ll=${lat}%2C${lng}&navigate=yes&zoom=17` });
    const url = Platform.select({
      ios: `${scheme}${lat}+${lng}`,
      android: `${scheme}${lat}+${lng}`
    });
    Linking.openURL(url)
  }

  return (
    <Container isTransparentStatusBar={false}>
      <Header _this={{ navigation }} />
      <Body _this={{ navigation, map, rideDetails, currentLocation, navigationMode, callUser, startTowRide, completeTowRide, newMessageCount, setNewMessageCount }} />
    </Container>
  )
}

export default InProgress

