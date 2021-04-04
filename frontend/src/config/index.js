import ENVDATA from "../../env.json"

import {
    Platform
} from 'react-native';

var config = {
    isAndroid: Platform.OS === "android" ? true : false,
    isIos: Platform.OS === "android" ? false : true,
    android_version: '1.0.0',
    ios_version: '1.0.0',
	online_session_timeout: 3, // in Minute
	session: null
}
export default config
export const BASE_WIDTH = 360
export const BASE_HEIGHT = 640

