import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  BackHandler
} from 'react-native';
import styles from './style'
import Config from '../../config'
import { Container, Toast } from '../../components'
import { Mixins, Spacing, Typography } from '../../styles'
import API from '../../services/api'
import { useDdux } from '../../hooks'
import Body from './body'
import Header from './header'

const Login = ({ route, navigation }) => {
  const { destination = null, source = null } = route.params || {}
  const Ddux = useDdux()
  const [phone, setPhone] = useState('')
  const [userDetails, setUserDetails] = useState({ name: '' })
  const [countryData, setCountryData] = useState(defaultCountryData)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [activeScreen, setActiveScreen] = useState(1)
  const [otpValue, setOtpValue] = useState(['', '', '', ''])
  const inputRef = useRef([])

  const getVerificationCode = async () => {
    if (phone.length < 10)
      return Toast.show({ type: 'error', message: 'Invalid mobile number.' })
    Ddux.setData('loading', true)
    let mobileNumber = countryData.callingCode + phone
    /*
     * API Send OTP
     */
    let response = await API.sendOtp(mobileNumber)
    Ddux.setData('loading', false)
    console.log('OTP >>>> ', response.data.otp)
    if (!response.status) {
      return Toast.show({ type: 'error', message: response.error })
    }
    setActiveScreen(2)

  }

  const onOtpValueChange = (value, index) => {
    let temp = [...otpValue]
    temp[index] = value
    setOtpValue(temp)
    if (value !== '' && index !== 3)
      inputRef.current[index + 1].focus()
  }

  const onLogin = async () => {
    try {
      let otp = parseInt(otpValue.join(''))
      if (!Number.isInteger(otp) || otp < 1000)
        return Toast.show({ type: 'error', message: 'Please enter a valid Code.' })

      Ddux.setData('loading', true)
      let mobileNumber = countryData.callingCode + phone
      /*
       * API Login
       */
      let response = await API.verifyOtp(mobileNumber, otp)
      Ddux.setData('loading', false)
      if (!response.status) {
        return Toast.show({ type: 'error', message: response.error })
      }
      if (response.data.isUserExists) {
        response.data.token_expiry = new Date().getTime() + 45 * 60000;
        Config.session = { mobile: response.data.mobile, active_session_refresh_token: response.data.active_session_refresh_token, access_token: response.data.access_token, token_expiry: response.data.token_expiry }
        Ddux.setCache('user', response.data)
        if (destination)
          navigation.replace('Home_Booking', { destination: destination, source: source })
        else
          navigation.pop()
      }
      else {
        setActiveScreen(3)
      }
    }
    catch (e) {
      console.error(e)
    }
  }

  const onSignup = async () => {
    try {
      if (userDetails.name.length < 3)
        return Toast.show({ type: 'error', message: 'Please enter a valid name.' })
      Ddux.setData('loading', true)
      let mobileNumber = countryData.callingCode + phone
      /*
       * API Signup
       */
      let response = await API.signUp({ ...userDetails, mobile: mobileNumber })
      Ddux.setData('loading', false)
      if (!response.status) {
        return Toast.show({ type: 'error', message: response.error })
      }
      response.data.token_expiry = new Date().getTime() + 45 * 60000;
      Config.session = { mobile: response.data.mobile, active_session_refresh_token: response.data.active_session_refresh_token, access_token: response.data.access_token, token_expiry: response.data.token_expiry }
      Ddux.setCache('user', response.data)
      if (destination)
        navigation.replace('Home_Booking', { destination: destination, source: source })
      else
        navigation.pop()
    }
    catch (e) {
      console.error(e)
    }
  }

  return (
    <Container isTransparentStatusBar={false}>
      <Header _this={{ navigation }} />
      <Body _this={{ navigation, setCountryData, isModalVisible, setIsModalVisible, countryData, phone, setPhone, getVerificationCode, activeScreen, otpValue, inputRef, onOtpValueChange, onLogin, userDetails, setUserDetails, onSignup }} />
    </Container>
  )
}

export default Login


const defaultCountryData = { "callingCode": "972", "code": "IL", "flag": "data:image/png;base64,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", "name": "Israel" }