import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Animated,
    Easing,
    TextInput,
    Keyboard,
    UIManager,
    findNodeHandle
} from 'react-native';

const KeyboardHandledView = ({ onKeyboardEvent=null , offset = 0, style = { flex: 1 }, ...props }) => {

    style = { ...style, overflow: 'hidden' }
    const TextInputState = TextInput.State

    useEffect(() => {
        const keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
        const keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);
        return (() => {
            keyboardDidShowSub.remove();
            keyboardDidHideSub.remove();
        })
    }, [])

    const parentContainerRef = useRef(null)
    const adjustedMargin = useRef(new Animated.Value(0)).current;


    const handleKeyboardDidShow = (event) => {
        const { height: windowHeight } = Dimensions.get('window');
        const keyboardHeight = event.endCoordinates.height;
        const currentlyFocusedField = TextInputState.currentlyFocusedInput();

        /*
        * If currently focus text field belongs to this app / screen not any top notification textbox of messenger or whatsapp
        * If currently focused text field is child of this component not any other modal
        */

        if (currentlyFocusedField) {
            UIManager.viewIsDescendantOf(findNodeHandle(currentlyFocusedField), findNodeHandle(parentContainerRef.current), (isDescendantOf) => {
                if (!isDescendantOf)
                    return
                currentlyFocusedField.measure((originX, originY, width, height, pageX, pageY) => {
                    const depthUnderKeyboard = (windowHeight - keyboardHeight) - (pageY + height + offset);
                    if (depthUnderKeyboard >= 0) {
                        return;
                    }
                    Animated.timing(
                        adjustedMargin,
                        {
                            toValue: depthUnderKeyboard,
                            duration: 200,
                            //easing: Easing.linear,
                            useNativeDriver: false,
                        }
                    ).start()
                    if(onKeyboardEvent)
                        onKeyboardEvent({...event,keyboardOpen: true,depthUnderKeyboard: depthUnderKeyboard})
                });
            });
        }

    }

    const handleKeyboardDidHide = (event) => {
        if(onKeyboardEvent)
            onKeyboardEvent({...event,keyboardOpen: false,depthUnderKeyboard: null})
            
        Animated.timing(
            adjustedMargin,
            {
                toValue: 0,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: false,
            }
        ).start()
    }

    return (
        <View ref={parentContainerRef} style={style}>
            <Animated.View style={[styles.contentContainer, { top: adjustedMargin }]}>
                {props.children}
            </Animated.View>
        </View>
    );
}


const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        width: '100%'
    }
});

export default KeyboardHandledView



