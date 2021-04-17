import React, { useEffect, useRef } from 'react';
import { Toast } from '../../components'
import Geocoder from 'react-native-geocoding';
import { useDdux } from '../../hooks'
import Header from './header'

const Booking = ({ route }) => {
  const { destination = null, source = null } = route.params
  const Ddux = useDdux()
  const rideDetails = Ddux.cache('ride')
  const userDetails = Ddux.cache('user')
  const currentLocation = source
  const map = useRef(null)

    useEffect(()=>{
        Geocoder.from(currentLocation)
        .then(data=>{
            setPickupPoint(data.results[0].formatted_address)
        })  
        .catch(e=>{
            console.log(e)
        })      
    },[])

      Ddux.setData('loading',false)
      if (!response.status) {
        return Toast.show({ type: 'error', message: response.error })
      }
      Ddux.setCache('ride',{...response.data,source: source, destination: destination, tow_type: towType, popupStep: 1})
      setPopupStep(1)
  

  return (
    <Container isTransparentStatusBar={false}>
      <Header _this={{ navigation }} />
      {/* TO DO : // Body */}
    </Container>
  )
}

export default Booking

