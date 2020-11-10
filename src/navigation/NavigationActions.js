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