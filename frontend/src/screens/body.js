import React from 'react';
import {
    View,
    Text,
    ImageBackground
} from 'react-native';
import { useTheme } from '../../hooks'
import style from './style'
import { Mixins, Typography } from '../../styles'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { chat_background } from '../../assets'
import { ChatTimeFormat } from '../../utils'
import ChatInputBox from './chatInputBox'


const Body = ({ _this }) => {
    const [Colors, styles] = useTheme(style)



    return (
        <View style={styles.flex1}>
            <ImageBackground source={chat_background} style={styles.background} >
                <View> Chat </View>
            </ImageBackground>
        </View>
    )
}

export default Body
