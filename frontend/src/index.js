import React, { useState, useEffect, useRef, useReducer } from 'react';
import {
    StatusBar
} from 'react-native';
import Navigation from './navigation'
import { ThemeProvider, LanguageProvider, DduxProvider } from './lib'
import { initialState, initialCache } from './store'
import { GlobalLayouts } from './components'



const AppContainer = () => {

    return (
        <DduxProvider initialState={initialState} initialCache={initialCache}>
            <ThemeProvider>
            <LanguageProvider>
                <GlobalLayouts>
                    <StatusBar barStyle={'light-content'} translucent={true} backgroundColor='transparent' />
                    <Navigation />
                </GlobalLayouts>
            </LanguageProvider>
            </ThemeProvider>
        </DduxProvider>
    )
}


export default AppContainer