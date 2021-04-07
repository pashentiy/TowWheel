import React, { useState, useEffect, useRef, useCallback } from 'react';
import Config from 'src/config';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const DduxContext = React.createContext({
    data: () => { },
    cache: () => { },
    setData: () => { },
    setCache: () => { }
});


export const DduxProvider = ({ initialState = {}, initialCache = {}, ...props }) => {

    const cacheKey = "@dduxCache"
    const [cacheData, setCacheData] = useState({})
    const [data, setData] = useState(initialState)

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const cache = JSON.parse(await AsyncStorage.getItem(cacheKey))
        if (cache)
            setCacheData(cache)
        else
            setCacheData(initialCache)
    }

    const setCache = async (newValue) => {
        try {
            const value = JSON.stringify(newValue);
            await AsyncStorage.setItem(cacheKey, value);
        } catch (e) { }
    }

    const _setData = useCallback((key, value) => {
        setData(prevState => {
            return { ...prevState, [key]: value }
        });
    }, []);


    const _getData = (key) => {
        try {
            return data[key]
        } catch (e) {
            console.log(e)
        }
    }
