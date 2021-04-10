import React, { useState, useEffect, useRef } from 'react';
import {
    Keyboard,
    View,
    StyleSheet
} from 'react-native';
import {
    createDrawerNavigator,
    NavigationContainer,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Screen from 'src/screens';
import { Mixins } from 'src/styles';
import { useTheme } from 'src/hooks'
import CustomDrawerContent from './CustomDrawerContent'

const Drawer = createDrawerNavigator();

const Dashboard = () => {
    const [Colors, styles] = useTheme(style)
    return (
        <>
        <View style={[styles.statusBar, { height: Mixins.STATUSBAR_HEIGHT }]}>
        </View>
        <Drawer.Navigator
            initialRouteName="Home"
            drawerStyle={{backgroundColor: Colors.background}}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={Screen.Home} />
            <Drawer.Screen name="Notifications" component={Screen.Home} />
        </Drawer.Navigator>
        </>
    );
}

const style = ({Colors})=>(StyleSheet.create({
    statusBar: {
        backgroundColor: Colors.status_bar,
    }
}))


export default Dashboard