import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Image,
    Text
} from 'react-native';
import style from './style'
import { logo } from '../../assets'
import Config from '../../config'
import { useDdux, useTheme } from '../../hooks'
import API from '../../services/api'
import { Container, Toast } from '../../components'

var initialLoading = false

const Splash = ({ navigation }) => {
    const [Colors, styles] = useTheme(style)
    const Ddux = useDdux()
    const userDetails = Ddux.cache('user')

    useEffect(()=>{
        initialLoading = false
    },[])

    useEffect(() => {
        if (userDetails !== null && !initialLoading){
            initialLoading = true 
            verifyLoginSession()
        }
    }, [userDetails])

    const verifyLoginSession = async () => {
        if (Object.keys(userDetails).length == 0)
            return navigation.replace('Home')
        try {
            /*
             * API LoginByToken
             */
            let response = await API.loginByToken(userDetails.mobile, userDetails.active_session_refresh_token)
            if (!response.status) {
                return Toast.show({ type: 'error', message: response.error })
            }
            else if (!response.data.isUserExists) {
                Ddux.setCache('user', {})
            }
            else {
                response.data.token_expiry = new Date().getTime() + 45 * 60000;
                Config.session = { mobile: response.data.mobile, active_session_refresh_token: response.data.active_session_refresh_token, access_token: response.data.access_token, token_expiry: response.data.token_expiry }
                Ddux.setCache('user', response.data)
            }
            navigation.replace('Home')
        }
        catch (e) {
            console.log(e)
        }
    }
    return (
        <Container style={styles.centerAll} isTransparentStatusBar={false}>
            <View style={styles.flex1, styles.centerAll}>
                <Image
                    style={styles.logo}
                    source={logo}
                />
            </View>
        </Container>
    )
}

export default Splash


