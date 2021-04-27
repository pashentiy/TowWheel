import React, { useState, useEffect, useRef, useReducer } from 'react';
import {
  View,
  Text,
  BackHandler,
  Platform,
  Linking
} from 'react-native';
import { Container, Toast } from '../../components'
import { useDdux } from '../../hooks'
import Body from './body'
import Header from './header'

var socket = null

const InProgress = ({ navigation }) => {
  const Ddux = useDdux()
  const rideDetails = Ddux.cache('ride')
  const userDetails = Ddux.cache('user')
  const [driverVehicleDetails, setDriverVehicleDetails] = useState(null)
 

  
  return (
    <Container isTransparentStatusBar={false}>
      <Header _this={{ navigation }} />
      <Body _this={{ navigation }} />
    </Container>
  )
}

export default InProgress

