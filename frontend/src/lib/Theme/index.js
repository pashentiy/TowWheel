import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Themes } from 'src/styles/colors'
const ThemeKeys = Object.keys(Themes)

export const ThemeContext = React.createContext({
    colors: {},
    theme: null ,
    changeTheme: ()=>{}
});