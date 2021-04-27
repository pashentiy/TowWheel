import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import * as Screen from '../screens';
import Drawer from './Drawer';

const Stack = createStackNavigator();
const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash"
        mode="modal"
        headerMode="none"
      >
        <Stack.Screen name="Splash" component={Screen.Splash} />
        <Stack.Screen name="Login" component={Screen.Login} />
        <Stack.Screen name="Home_Booking" component={Screen.Home_Booking} />
        <Stack.Screen name="Home_InProgress" component={Screen.Home_InProgress} />
        <Stack.Screen name="Home_Driver_InProgress" component={Screen.Home_Driver_InProgress} />
        <Stack.Screen name="Home" >
          {props => <Drawer {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
