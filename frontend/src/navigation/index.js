import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import * as Screen from 'src/screens';
import Drawer from './Drawer'

const Stack = createStackNavigator();
const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
        mode="modal"
        headerMode="none"
      >
        <Stack.Screen name="Splash" component={Screen.Splash} />
        <Stack.Screen name="Login" component={Screen.Login} />
        <Stack.Screen name="Home" >
          {props => <Drawer {...props} />}
        </Stack.Screen>
        {/*<Stack.Screen name="OnBoard" component={Screen.OnBoard} />
        <Stack.Screen name="Login" component={Screen.Login} />
        <Stack.Screen name="OtpVerification" component={Screen.OtpVerification} />
        <Stack.Screen name="Dashboard" >
          {props => <BottomTab {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Profile" component={Screen.Profile} />
        <Stack.Screen name="ProfileComments" component={Screen.ProfileComments} />
        <Stack.Screen name="ChatList_Chats" component={Screen.ChatList_Chats} />
  <Stack.Screen name="RoomlistRoom" component={Screen.RoomlistRoom} />*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
