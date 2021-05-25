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
import { Mixins, Spacing, Typography } from '../../styles'
import API from '../../services/api'
import { useDdux } from '../../hooks'
import Body from './body'
import Header from './header'

var socket = null

const InProgress = ({ route, navigation }) => {
  const isFocused = useIsFocused()
  const Ddux = useDdux()
  const rideDetails = Ddux.cache('ride')
  const userDetails = Ddux.cache('user')
  const map = useRef(null)
  const [driverVehicleDetails, setDriverVehicleDetails] = useState(null)
  const [arrivingIn, setArrivingIn] = useState('0')
  const [newMessageCount, setNewMessageCount] = useState(0)
  const [nearestGarage, setNearestGarage] = useState([])
  const [, forceRender] = useReducer(x => x + 1, 0);


  useEffect(() => {
    if (isFocused) {
      socketHandler()
    }

    if (!isFocused) {
      if (socket)
        socket.close();
    }
  }, [isFocused]);

  useEffect(() => {
    getNearestGarages()
  }, [])

  /*
   * Socket Handler
   */
  const socketHandler = async () => {
    socket = await API.SOCKET('/user-driver-inprogress')
    socket.on('connect', () => {
      socket.emit('initialize_user', { ride_id: rideDetails._id }, (response) => {
        Ddux.setCache('ride', {
          ...rideDetails,
          ride_status: response.ride_status
        })
        setNewMessageCount(response.unread_chat_count)
        setDriverVehicleDetails((prev)=>({driver_details: {...response.assigned_driver,...response.driver_details}, vehicle_details: response.assigned_vehicle}))
      })
    });

    socket.on('driver_location_changed',(response) => {

      setDriverVehicleDetails((prev)=>{
        let temp = {...prev}
        temp.driver_details.location.heading = response.heading
        temp.driver_details.location.coordinates = [response.longitude,response.latitude]
        //console.log('Location changed >>',temp)
        return temp
      })
    })

    socket.on('new_message', (data) => {
      if(data.sender !== userDetails._id){
        setNewMessageCount(prev=>prev+1)
        Toast.show({ type: 'info', message: 'New Message : '+data.message })
      }
    })

    socket.on('start_tow_ride',(response) => {
      const temp = {...rideDetails}
      temp.destination = {address: response.address, latitude: response.coordinates[1], longitude: response.coordinates[0]}
      temp.ride_status = 'started'
      Ddux.setCache('ride',temp)
    })

    socket.on('complete_ride',(response) => {
      navigation.pop()
      setTimeout(()=> Ddux.setCache('ride',null) ,1500)
    })

    socket.on('disconnect', () => {

    });
  }

  const cancelRideRequest = async () => {
    socket.emit('cancel_ride_request', { ride_id: rideDetails._id, driver_id: rideDetails.assigned_driver }, (response) => {
      if (response) {
        navigation.pop()
        setTimeout(()=>Ddux.setCache('ride', null),1500)
      }
    })
  }

  const callDriver = () => {
    let phoneNumber = `tel:+${driverVehicleDetails.driver_details.mobile}`;
    Linking.openURL(phoneNumber);
  };

  const getNearestGarages = async () => {
    /*
     * API GetNearestGarages
     */
    const location = rideDetails.destination
    let response = await API.getNearestGarages(location.latitude, location.longitude)
    if (!response.status) {
      return Toast.show({ type: 'error', message: response.error })
    }
    setNearestGarage(response.data)
  }

  const changeDestination = (item)=>{
    socket.emit('change_destination', { address: item.address, longitude: item.location.coordinates[0], latitude: item.location.coordinates[1] }, (response) => {
      const temp = {...rideDetails}
      temp.destination = {address: item.address, latitude: item.location.coordinates[1], longitude: item.location.coordinates[0]}
      Ddux.setCache('ride',temp)
    })
  }


  return (
    <Container isTransparentStatusBar={false}>
      <Header _this={{ navigation }} />
      <Body _this={{ navigation, map, rideDetails, driverVehicleDetails, arrivingIn, setArrivingIn, cancelRideRequest, callDriver, newMessageCount, setNewMessageCount, nearestGarage, changeDestination }} />
    </Container>
  )
}

export default InProgress

