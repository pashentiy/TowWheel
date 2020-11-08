import React, { useMemo, useState } from 'react';
import { View, StyleSheet, TextInput, Text, Platform } from 'react-native';
import Animated, { Value, Easing, timing } from 'react-native-reanimated';

import { fonts } from '../../utilities';
import TextButton from '../TextButton';
import PasswordEye from './PasswordEye';
import colors from '../../utilities/colors';

const INITIAT_VALUE = -5;
const FINAL_VALUE = -20;

const getConfig = (toValue) => ({
    duration: 200,
    toValue,
    easing: Easing.inOut(Easing.ease)
});

const AnimatedInput = ({ placeholder, value, onChangeText, errors, ...props }) => {
    const animation = useMemo(() => new Value(INITIAT_VALUE), []);

    const onFocus = () => timing(animation, getConfig(FINAL_VALUE)).start();

    const onBlur = () => !value && timing(animation, getConfig(INITIAT_VALUE)).start();

    const [textIsVisible, setTextVisible] = useState(true);

    return (
        <View style={s.container}>
            <Animated.Text style={[s.placeholder, { transform: [{ translateY: animation }] }]}>{placeholder}</Animated.Text>
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    value={value}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChangeText={onChangeText}
                    style={s.textInput}
                    {...props}
                    secureTextEntry={textIsVisible && props.secureTextEntry}
                />
                {props.secureTextEntry && (
                    <PasswordEye
                        textIsVisible={textIsVisible}
                        setTextVisible={setTextVisible}
                    />
                )}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={s.errors}>
                    {errors}
                </Text>

                {props.buttonRight && (
                    <View style={{ position: 'absolute', right: 0 }}>
                        <TextButton
                            title={props.buttonRight}
                            onPress={props.actionButtonRight}
                            style={{
                                textDecorationLine: 'underline',
                                color: colors.$black_70
                            }}
                        />
                    </View>
                )}
            </View>
        </View>
    )
}

export default AnimatedInput;

const s = StyleSheet.create({
    container: {
        ...Platform.select({
            ios: {
                marginVertical: 0,
            },
        }),
    },
    placeholder: {
        position: 'absolute',
        color: 'gray',
        fontFamily: fonts.Arial,
        ...Platform.select({
            android: {
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
            },
        }),
    },
    textInput: {
        borderBottomWidth: 1,
        width: '100%',
        height: 16,
        paddingBottom: 0,
        paddingTop: 0,
        paddingLeft: 0
    },
    errors: {
        position: 'absolute',
        fontFamily: fonts.Arial,
        marginVertical: 0,
        color: colors.$red
    }
});