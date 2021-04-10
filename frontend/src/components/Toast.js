import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import Modal from 'react-native-modal';

var config = {
    offset: 80,
    icons: undefined
}

class Toast extends React.Component{
    static _ref = null;

    static setRef(ref = {}) {
        this._ref = ref;
    }
    
    static getRef() {
        return this._ref;
    }
    
    static clearRef() {
        this._ref = null;
    }
    
    static show(options = {}) {
        this._ref.show(options);
    }

    constructor(props){
        super(props);
        this.state = {
            isVisible: false,
            type: 'error',
            message: 'Toast Message',
            delay: 2000
        }
        if(this.props.icons !== undefined){
            config.icons = this.props.icons
        }
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    show = (options = {})=>{
        if(!this.state.isVisible)
            this.setState({...options,isVisible: true})
    }

    hide = ()=>{
        if(this.state.isVisible)
            this.setState({isVisible: false})
    }

    render(){
        return(
            this.state.isVisible && 
            <Modal isVisible={true} hasBackdrop={false} coverScreen={false} avoidKeyboard>
                <BaseToast type={this.state.type} message={this.state.message} delay={this.state.delay} hide={this.hide} />
            </Modal>
        );
    }
}

const BaseToast = ({type='info',message='Toast Message',delay=1500,hide})=>{
    useEffect(() => {
        setTimeout(()=>{toastShow()},100)
    });
    const translateY = useRef(new Animated.Value(100)).current
    const opacity = translateY.interpolate({
        inputRange: [0,50,100],
        outputRange: [1,0.5,0]
    })
    const toastShow = () => {
        Animated.parallel([
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
            })
        ]).start(() => {
            setTimeout(()=>{toastHide()},delay)
        });
    };
    const toastHide = () => {
        Animated.parallel([
            Animated.spring(translateY, {
                toValue: 100,
                useNativeDriver: true,
            })
        ]).start(() => {
            hide()
        });
    };
    
    const container = type=='success'?styles.successToast:type=='error'?styles.errorToast:styles.infoToast
    const text = type=='success'?styles.successText:type=='error'?styles.errorText:styles.infoText
    const Icon = type=='success'?config.icons.Success:type=='error'?config.icons.Error:config.icons.Info
    const color = type=='success'?'#7B9E23':type=='error'?'#EF515F':'#3AC5F3'

    return (
        <Animated.View
            style={[styles.toast,container,styles.positionBottom,{transform: [{ translateY }],opacity: opacity} ]}
        >
            <Icon color={color} />
            <Text style={[styles.text,text]}>{message}</Text>
        </Animated.View>
    );
}

export default Toast

var styles = StyleSheet.create({
    positionBottom:{
        position: 'absolute',
        zIndex: 999999,
        bottom: config.offset
    },
    toast:{
        backgroundColor: '#FFF',
        borderWidth: 0.3,
        borderLeftWidth: 6,
        alignSelf: 'center',
        width: '90%',
        padding: 20,
        paddingLeft: 10,
        borderRadius: 10,
        elevation: 10,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    successToast:{
        borderColor: '#7B9E23'
    },
    errorToast:{
        borderColor: '#EF515F'
    },
    infoToast:{
        borderColor: '#3AC5F3'
    },
    text:{
        fontSize: 16,
        fontWeight: '400',
        marginLeft: 10,
        marginRight: 10,
    },
    successText:{
        color: '#7B9E23'
    },
    errorText:{
        color: '#EF515F'
    },
    infoText:{
        color: '#3AC5F3'
    },
})