import React, { useState, useEffect, useRef } from 'react';
import { Container, Toast } from '../../components'
import API from '../../services/api'
import Geocoder from 'react-native-geocoding';
import { useDdux } from '../../hooks'
import Body from './body'
import Header from './header'

const Booking = ({ route, navigation }) => {
  const { destination = null, source = null } = route.params
  const Ddux = useDdux()
  const rideDetails = Ddux.cache('ride')
  const userDetails = Ddux.cache('user')
  const currentLocation = source
  const map = useRef(null)
  const [distanceTime, setDistanceTime] = useState({distance: null, duration: null})
  const [pickupPoint, setPickupPoint] = useState(null)
  const [towType, setTowType] = useState('BIKE')
  const [popupStep,setPopupStep] = useState(rideDetails!=null ? 1 : 0)

    useEffect(()=>{
        Geocoder.from(currentLocation)
        .then(data=>{
            setPickupPoint(data.results[0].formatted_address)
        })  
        .catch(e=>{
            console.log(e)
        })      
    },[])

    const createRideRequest = async()=>{
      /*
       * API createRideRequest
       */
      Ddux.setData('loading',true)
      let response = await API.createRideRequest({
        source: [currentLocation.longitude,currentLocation.latitude],
        destination: [destination.location.lng, destination.location.lat],
        distance: distanceTime.distance, // In KM
        time: distanceTime.duration, // In minute,
        tow_type: towType
      })
      Ddux.setData('loading',false)
      if (!response.status) {
        return Toast.show({ type: 'error', message: response.error })
      }
      Ddux.setCache('ride',{...response.data,source: source, destination: destination, tow_type: towType, popupStep: 1})
      setPopupStep(1)
    }

  return (
    <Container isTransparentStatusBar={false}>
      <Header _this={{ navigation }} />
      <Body _this={{ navigation, destination, map, currentLocation, setDistanceTime, pickupPoint,towType, setTowType, popupStep, setPopupStep, createRideRequest }} />
    </Container>
  )
}

export default Booking

