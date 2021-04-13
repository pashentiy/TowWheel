import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import MobileInput from './mobileInput'
import MobileVerification from './mobileVerification'
import Registration from './registration'

const Body = ({ _this }) => {
    if(_this.activeScreen == 1)
    return <MobileInput _this={_this} />
    else if(_this.activeScreen == 2)
    return <MobileVerification _this={_this} />
    else
    return <Registration _this={_this} />
}

export default Body