import React, { useState } from 'react';
import { View, Text, Keyboard, TextInput, StyleSheet, Image, ScrollView } from 'react-native';


import GetCodeButton from '../../components/Button';
import CountryPicker from './CountryPicker';
import { colors, fonts, images } from '../../utilities';
import OTopImage from '../../components/OTopImage';
import KeyboardShifter from '../../components/KeyboardShifter';
import { useNavigation } from '@react-navigation/native';
import { showToast } from '../../utilities/errorHanlders';
import { NavigateToPhoneActivationStep2 } from '../../navigation/NavigationActions';

import { Auth } from 'aws-amplify';


const defaultSelected = {
    callingCode: "1",
    code: "US",
    name: "United States",
}

const SigninForm = () => {
    const navigation = useNavigation();
    const [phone, setPhone] = useState('');
    const [selected, setSelected] = useState(defaultSelected);

    const onChangeText = (text) => setPhone(text);

    const onSubmit = () => {

        if (phone.length < 6) {
            showToast('Sorry...', 'You must insert a valid phone number.', colors.$app_red)
            return;
        }
        else {


            const _fullNumber = `(+${selected.callingCode}) ${phone}`;
            const modifyNumber = phone[0] == '0' ? phone.substr(1, phone.length) : phone;
            const _callingNumber = `+${selected.callingCode}${modifyNumber}`;

            //TODO:// Verification Screen
            // navigation.dispatch(NavigateToPhoneActivationStep2({
            //     callingCode: selected.callingCode,
            //     callerNumber: phone,
            //     fullNumber: _fullNumber
            // }))

            //TODO:// AWS PHONE SEND VERIFYING SMS
            signUp();

        }
        async function signUp() {
            try {
                const { user } = await Auth.signUp({
                    username: '+972526954660',
                    password: '+972526954660',
                    attributes: {
                        phone_number: "+972526954660",   // optional - E.164 number convention
                        // other custom attributes 
                    }
                });
                console.log(user);
            } catch (error) {
                console.log('error signing up:', error);
                if (error.code === "UsernameExistsException") {
                    showToast('Sorry...', 'This phone number is already exist.', colors.$app_red)
                }

            }
        }

        // dispatch(appActions.verifyCallerNumber(selected.callingCode, phone));
        Keyboard.dismiss();
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.$white }}>
            <KeyboardShifter>
                <ScrollView>
                    {/* Image */}
                    <OTopImage
                        source={images.login.sendCode}
                    />

                    {/* Title */}
                    <View style={s.titleContainer}>
                        <Text style={s.title}>Verification</Text>
                        <View style={s.subtitleContainer}>
                            <Text style={s.subtitle}>Enter Your Mobile Number To</Text>
                            <Text style={s.subtitle}>Receive A Verification Code</Text>
                        </View>
                    </View>

                    {/* Container */}
                    <View style={s.mainContainer}>

                        {/* Country Picker */}
                        <View style={{ marginVertical: 30 }}>
                            <CountryPicker
                                selected={selected}
                                setSelected={setSelected}
                            />
                        </View>

                        {/* Get Code View */}
                        <View style={s.codeViewContainer}>
                            {/* Phone Input */}
                            <View style={s.phoneInputContainer}>
                                {/* Handset Image */}
                                <Image
                                    source={images.login.handSet}
                                    style={{ alignSelf: 'center', width: 15, height: 15 }}
                                    resizeMode='contain'
                                />
                                {/* Phone Code */}
                                <Text style={s.phoneCode}>
                                    (+{selected.callingCode})
                                </Text>
                                {/* Input */}
                                <TextInput
                                    style={s.phoneInput}
                                    placeholder='Phone number'
                                    value={phone}
                                    onChangeText={onChangeText}
                                    keyboardType='number-pad'
                                />
                            </View>

                            {/* Get Code Button */}
                            <View style={{ width: '80%', alignSelf: 'center' }}>
                                <GetCodeButton
                                    title='Get Code'
                                    textStyle={{ fontFamily: fonts.MontserratBold, fontWeight: '600' }}
                                    style={{ borderRadius: 40 }}
                                    colors={[colors.$app_red, colors.$app_red]}
                                    onPress={onSubmit}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardShifter>
        </View>
    );
}

export default SigninForm;

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
        marginBottom: 30
    },
    codeViewContainer: {
        height: 115,
        width: '100%',
        borderRadius: 10,
        justifyContent: 'space-between'
    },
    phoneInputContainer: {
        flexDirection: 'row',
        width: '80%',
        paddingHorizontal: 15,
        alignSelf: 'center',
        borderRadius: 10,
        borderColor: colors.$app_red,
        borderWidth: 0.5,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        backgroundColor: 'white',
        shadowOpacity: 0.1,
        shadowRadius: 10, // for ios
        elevation: 6, // for android
    },
    phoneCode: {
        alignSelf: 'center',
        color: colors.$black_50,
        fontFamily: fonts.MontserratBold,
        fontWeight: '400',
        marginHorizontal: 5,
        fontSize: 12
    },
    phoneInput: {
        flex: 1,
        fontSize: 12,
        paddingVertical: 10,
        letterSpacing: .7,
        fontFamily: fonts.MontserratBold,
        fontWeight: '400'
    },
});