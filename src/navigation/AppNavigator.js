import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Login from '../screens/LoginScreen';
import Home from '../screens/HomeScreen';

// import DrawerContainer from './Drawer';
// import Hamburger from './Hamburger';
import * as types from './types';


import { colors, fonts, images } from '../utilities';
import { FadeInOutAnimation } from './config';


const Stack = createStackNavigator();

const AppNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName={types.SCREEN_HOME}
            screenOptions={({ navigation }) => ({
                ...FadeInOutAnimation,
                headerStyle: {
                    backgroundColor: colors.$app_red,
                    shadowColor: colors.$app_red,
                    elevation: 0
                },
                headerTitleStyle: {
                    color: colors.$white,
                    fontFamily: fonts.Arial,
                },
                headerLeft: () => (
                    <TouchableOpacity
                        activeOpacity={.7}
                        onPress={() => navigation.goBack()}
                        style={{ padding: 15 }}>
                        <Image
                            resizeMode='contain'
                            style={{ height: 16, width: 30 }}
                            source={images.leftArrow}
                        />
                    </TouchableOpacity>
                )
            })}
        >

            <Stack.Screen
                name={types.SCREEN_HOME}
                options={{ headerShown: false }}
                component={Home}
            />
        </Stack.Navigator>
    );
}

export default AppNavigation;