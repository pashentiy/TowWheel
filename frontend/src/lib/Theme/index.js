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

export const ThemeProvider = (props) => {

    const [theme, setTheme] = useState(null);
    const themeKey = "@theme"
    const [colors, setColors] = useState(Themes[ThemeKeys[0]])

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const value = JSON.parse(await AsyncStorage.getItem(themeKey))
        if (value){
            setColors(Themes[value])
            setTheme(value)
        }
        else{
            setColors(Themes[ThemeKeys[0]])
            setTheme(ThemeKeys[0])
        }
    }

    const changeTheme = (theme)=>{
        setColors(Themes[theme])
        setTheme(theme)
        AsyncStorage.setItem(themeKey, JSON.stringify(theme));
    }

    return (
        <ThemeContext.Provider value={{
            colors: colors,
            theme: theme ,
            themeKeys: ThemeKeys,
            changeTheme: changeTheme
        }}>
            {props.children}
        </ThemeContext.Provider>
    )
}
