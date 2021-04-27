import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { Mixins } from '../styles'
import { useTheme } from '../hooks'

const Container = ({ isTransparentStatusBar = false, ...props }) => {
    const [Colors, styles] = useTheme(style)
    return (
        <View style={[styles.container, props.style]}>
            {isTransparentStatusBar==false && <MyStatusBar />}
            {props.children}
        </View>
    );
}

const MyStatusBar = ()=>{
    const [Colors, styles] = useTheme(style)
    return(
        <View style={[styles.statusBar,{height: Mixins.STATUSBAR_HEIGHT}]}>
        </View>
    )
}


const style = ({Colors})=>(StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.background
    },
    statusBar:{
        backgroundColor: Colors.status_bar
    }
})
);

export default Container



