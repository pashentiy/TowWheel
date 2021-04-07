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