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
export const API_URL = ENVDATA.API_URL
export const API_STORAGE = ENVDATA.API_STORAGE
export const GOOGLE_MAP_API_KEY = ENVDATA.GOOGLE_MAP_API_KEY
export const LOCALES = {
	ENGLISH: { id: 1, name: "en", label: "ENGLISH" },
	HEBREW: { id: 2, name: "he", label: "HEBREW" }
};
export const DOMAIN = ''
export const APP_URL = '' 
export const ENVIRONMENT = ENVDATA.ENVIRONMENT
