import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';

import KeyboardShifter from '../../components/KeyboardShifter';
import VerifyButton from '../../components/Button';
import OTopImage from '../../components/OTopImage';

import { colors, fonts, images } from '../../utilities';

const CallActivationOtpScreen = ({ navigation, route }) => {
    const [timer, setTimer] = useState(60);
    const { fullNumber, callingCode, callerNumber } = route.params;

    const onFulfill = (otpCode) => {
        //TODO:// Checking with AWS IF OTP IS GOOD
        //dispatch(appActions.activateCallerNumber(otpCode, callingCode, callerNumber));
    }

    const handleOnRecall = () => {
        //TODO:// AWS RESEND CODE
        //dispatch(appActions.verifyCallerNumber(callingCode, callerNumber));
        setTimer(60);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(_timer => _timer - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const getButtonTitle = () => {
        if (timer >= 0) {
            return `Re-send in 0:${timer < 10 ? `0${timer}` : timer}`
        }
        return 'Resend'
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.$white }}>
            <KeyboardShifter>
                <ScrollView>
                    {/* Image */}
                    <OTopImage
                        source={images.login.verifyCode}
                    />
                    {/* Title */}
                    <View style={s.titleContainer}>
                        <Text style={s.title}>Verification</Text>
                        <View style={s.subtitleContainer}>
                            <Text style={s.subtitle}>You will receive a SMS of five</Text>
                            <Text style={s.subtitle}>digits code at {fullNumber}</Text>
                        </View>
                    </View>

                    {/* Container */}
                    <View style={s.mainContainer}>
                        {/* Code Input */}
                        <CodeInput
                            activeColor={colors.$app_red}
                            inactiveColor={colors.$app_red}
                            autoFocus={true}
                            ignoreCase={true}
                            inputPosition='center'
                            size={45}
                            onFulfill={onFulfill}
                            containerStyle={s.codeInputContainer}
                            codeInputStyle={s.codeInputStyle}
                            keyboardType='number-pad'
                        />

                        {/* Verify Button */}
                        <View style={s.buttonContainer}>
                            <VerifyButton
                                disabled={timer > 0}
                                title={getButtonTitle()}
                                textStyle={{ fontFamily: fonts.MontserratBold, fontWeight: '600' }}
                                style={{ borderRadius: 40 }}
                                colors={[colors.$app_red, colors.$app_red]}
                                onPress={handleOnRecall}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardShifter>
        </View>
    )
}

export default CallActivationOtpScreen;

const s = StyleSheet.create({
    titleContainer: {
        marginTop: 50
    },
    title: {
        textAlign: 'center',
        fontFamily: fonts.MontserratBold,
        fontSize: 22
    },
    subtitleContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    subtitle: {
        fontFamily: fonts.MontserratBold,
        fontWeight: '300',
        marginBottom: 10
    },
    mainContainer: {
        width: '80%',
        alignSelf: 'center',
    },
    codeInputContainer: {
        marginVertical: 20,
    },
    codeInputStyle: {
        borderRadius: 30,
        borderColor: colors.$app_red,
        fontFamily: fonts.MontserratBold
    },
    buttonContainer: {
        width: '80%',
        marginTop: 20,
        alignSelf: 'center'
    }
})