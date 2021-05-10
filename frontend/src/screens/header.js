import React from 'react';
import { Text } from 'react-native';
import style from './style'
import { useTheme } from '../../hooks'
import { HeaderBar } from '../../components'

const Header = ({ _this }) => {
    const [Colors, styles] = useTheme(style)
    return (
        <HeaderBar navigation={_this.navigation} >
            <Text style={styles.title}> {_this.name} </Text>
        </HeaderBar>
    )
}

export default Header


