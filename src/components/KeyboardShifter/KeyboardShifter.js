import React, { useEffect } from 'react';
import {
    Animated,
    ScrollView,
    Dimensions,
    Keyboard,
    StyleSheet,
    TextInput,
    UIManager,
    Platform,
    findNodeHandle,
} from 'react-native';

import { helpers, isIOS } from '../../utilities';

const shift = new Animated.Value(0);

const KeyboardShiftScrollView = (props) => {
    const iosExtraheight = props.iosExtraHeight || 50;
    const andrExtraheight = props.andrExtraHeight || 70;


    useEffect(() => {
        const callbacks = {
            keyboardWillShowEvent: Keyboard.addListener(
                Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
                handleKeyboardDidShow,
            ),
            keyboardWillHideEvent: Keyboard.addListener(
                Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
                handleKeyboardDidHide,
            ),
        };

        return () => {
            Object.values(callbacks).forEach((callback) => {
                callback && callback.remove()
            })
        }
    }, []);

    const handleKeyboardDidShow = (event) => {
        try {
            const { height: windowHeight } = Dimensions.get('window');
            const keyboardHeight = event.endCoordinates.height;
            const currentlyFocusedInput =
                (TextInput.State.currentlyFocusedInput
                    ? findNodeHandle(TextInput.State.currentlyFocusedInput())
                    : TextInput.State.currentlyFocusedField()) || 0;

            UIManager.measure(
                currentlyFocusedInput,
                (originX, originY, width, height, pageX, pageY) => {
                    const fieldHeight = height || 0;
                    const fieldTop = pageY || 0;
                    const gap =
                        windowHeight -
                        keyboardHeight -
                        (fieldTop +
                            fieldHeight +
                            (Platform.OS === 'ios'
                                ? iosExtraheight
                                : andrExtraheight));

                    if (gap >= 0) {
                        return;
                    }

                    Animated.timing(shift, {
                        toValue: isIOS ? gap : -fieldHeight,
                        duration: 300,
                        useNativeDriver: true,
                    }).start();
                },
            );
        } catch (e) {
            helpers.CrashLog('KeyboardShifter', e);
        }
    };

    const handleKeyboardDidHide = () => {
        Animated.timing(shift, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    return (
        <ScrollView
            contentContainerStyle={[
                s.container,
                props.contentContainerStyle
            ]}
        >
            <Animated.View style={[{ transform: [{ translateY: shift }] }, props.style]}>
                {props.children}
            </Animated.View>
        </ScrollView>
    );
};

const s = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
});

export default KeyboardShiftScrollView;
