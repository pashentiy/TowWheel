import { Platform, Dimensions } from "react-native";

import _colors from './colors';
import _fonts from './fonts';
import _layouts from './layouts';
import _images from './images';
import _resolutions from './resolutions';

export const colors = _colors;
export const fonts = _fonts;
export const layouts = _layouts;
export const images = _images;
export const resolutions = _resolutions;

export const screenHeight = Dimensions.get('screen').height;
export const screenWidth = Dimensions.get('screen').width;

export const currentPlatform = Platform.OS;

export const isIOS = currentPlatform === 'ios';
export const isAndroid = currentPlatform === 'android';



