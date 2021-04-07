import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    I18nManager
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCALES } from 'src/config';
import I18n from 'react-native-i18n';

//default locale
I18n.defaultLocale = LOCALES.ENGLISH.name;

// Enable fallbacks  to `en`
I18n.fallbacks = true;

//current locale
I18n.locale = LOCALES.ENGLISH.name;

//Add new language files here
I18n.translations = {
    en: require("src/utils/languages/en.json"),
    he: require("src/utils/languages/he.json")
};

export const LanguageContext = React.createContext({
    language: LOCALES.ENGLISH.name,
    isRTL: false,
    changeLanguage: () => { },
    t: () => { }
});

export const LanguageProvider = (props) => {

    const [language, setLanguage] = useState(null);
    const localeKey = "@locale"
    const [isRTL, setisRTL] = useState(false)

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const locale = JSON.parse(await AsyncStorage.getItem(localeKey))
        if (locale){
            I18n.locale = locale
            setLanguage(locale)
            if (locale == 'ar') {
                I18nManager.allowRTL(true);
                setisRTL(true)
            }
        }
        else
        setLanguage(LOCALES.ENGLISH.name)
    }

    const changeLanguage = (locale) => {
        I18n.locale = locale
        if (locale == 'ar') {
            I18nManager.allowRTL(true);
            setisRTL(true)
        }
        setLanguage(locale)
        AsyncStorage.setItem(localeKey, JSON.stringify(locale));
    }

    const translate = (text,parameter=null) => {
        let pattern = new RegExp(".+missing.*?","g");
        let str = I18n.t(text,parameter)
        return pattern.test(str)?text:str
    }

    return (
        <LanguageContext.Provider value={{
            language: language,
            changeLanguage: changeLanguage,
            isRTL: isRTL,
            t: translate
        }}>
            {props.children}
        </LanguageContext.Provider>
    )
}
