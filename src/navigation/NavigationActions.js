import { CommonActions } from '@react-navigation/native';

import * as types from './types';

export const NavigateToSignin = () => {
    return CommonActions.navigate({
        name: types.SCREEN_SIGN_IN,
        params: {},
    })
}

export const NavigateToHome = () => {
    return CommonActions.navigate({
        name: types.SCREEN_HOME,
        params: {},
    })
}

export const NavigateToAppDrawer = () => {
    return CommonActions.navigate({
        name: types.SCREEN_APP_DRAWER,
        params: {},
    })
}

export const NavigateToSignup = () => {
    return CommonActions.navigate({
        name: types.SCREEN_SIGN_UP,
        params: {},
    })
}

export const NavigateToPhoneActivationStep2 = (params) => {
    return CommonActions.navigate({
        name: types.SCREEN_PHONE_ACTIVATION_STEP2,
        params,
    })
}