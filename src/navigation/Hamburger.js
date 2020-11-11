import React from 'react';
import { Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const Hamburger = (props) => {
    const navigation = useNavigation();

    const onPress = () => {
        navigation.dispatch(DrawerActions.toggleDrawer());
    }

    return (
        <TouchableOpacity onPress={onPress} style={s.container}>
            <LottieView
                source={require('../assets/animations/hamburger.json')}
                progress={0}
            />
        </TouchableOpacity>
    )
}

export default React.memo(Hamburger);

const s = StyleSheet.create({
    container: {
        width: 30,
        height: 30,
        marginLeft: Platform.OS === 'ios' ? 15 : 5
    }
})