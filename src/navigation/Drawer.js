import React from 'react';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import {AccessToken} from 'react-native-fbsdk';
import { colors, fonts } from '../utilities';
import Login from '../screens/LoginScreen/';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen/';
import HomeScreen from './src/Home';
import LoginScreen from './src/Login';
import Hamburger from './Hamburger';

function CustomDrawerContent(props) {
    this.state = {
        loginStatus: '',
      };
    
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />

        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();

const DrawerContainer = () => {
    return (
        <>
            <Drawer.Navigator
                title={"HELLO"}
                drawerStyle={{
                    backgroundColor: colors.$white,
                }}
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                initialRouteName="Home"
            >
                <Drawer.Screen name="Home"
                    options={{
                        headerShown: null,
                    }} component={HomeScreen} />
                <Drawer.Screen name="Sign In"
                    options={{
                        headerShown: null,
                    }} component={LoginScreen} />
                    <Drawer.Screen name="HomeChat"
                    options={{
                        headerShown: null,
                    }}  />
                    <Drawer.Screen name="Login"
                    options={{
                        headerShown: null,
                    }}  />
            </Drawer.Navigator>
        </>
    );
}


export default DrawerContainer;