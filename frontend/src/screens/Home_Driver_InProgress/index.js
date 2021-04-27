import React, { useState, useEffect, useRef, useReducer } from 'react';
import {
  View,
  Text,
  BackHandler,
  Platform,
  Linking
} from 'react-native';
import { Container, Toast } from '../../components'
import Body from './body'
import Header from './header'

var socket = null
var watchId = null

const InProgress = ({ route, navigation }) => {
  const { ride_details = null } = route.params
  const [rideDetails, setRideDetails] = useState(ride_details)



  return (
    <Container isTransparentStatusBar={false}>
      <Header _this={{ navigation }} />
      <Body _this={{ navigation }} />
    </Container>
  )
}

export default InProgress

