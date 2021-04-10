import {Dimensions,PixelRatio,Platform,StatusBar} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { BASE_WIDTH, BASE_HEIGHT } from '../config';

const { width, height } = Dimensions.get('window');

export const DEVICE_WIDTH = width

export const DEVICE_HEIGHT = height

export const scaleSize = size => (width/BASE_WIDTH) * size;

export const scaleHeight = size => (height/BASE_HEIGHT) * size;

export const scaleFont = size => size * PixelRatio.getFontScale();

export const NAVBAR_HEIGHT = Platform.OS === 'ios' ? 64 : 54

export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;
