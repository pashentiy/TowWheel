import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import LoginButton from '../../components/Button';
import TextButton from '../../components/TextButton';
import AnimatedInput from '../../components/AnimatedInput';
import { isIOS, fonts, colors } from '../../utilities';
import CText from '../../components/CText';
import images from '../../utilities/images';
// import { authActions } from '../../store/actions';
// import { useNavigation } from '@react-navigation/native';
// import { NavigateToPasswordRecovery, NavigateToSignup, NavigateToTerms } from '../../navigation/NavigationActions';
import { NavigateToSignup } from '../../navigation/NavigationActions';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_SIGN_UP } from '../../navigation/types';
import { Auth } from 'aws-amplify'

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email address must be valid')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'At least 6 characters length')
        .max(12, 'Password must be between 6 and 12 characters length')
        .required('Password is required'),
});

const SigninForm = () => {
    const navigation = useNavigation();


    const onFacebookButtonPress = () => {
        alert("Successfuly loged-in via Facebook");
    }

    const onGoogleButtonPress = () => {
        alert("Successfuly loged-in via Google");

    }

    const onAppleButtonPress = () => {
        alert("Successfuly loged-in via Apple");

    }

    const navigateToSignup = () => {
        navigation.dispatch(NavigateToSignup());
    }

    const towSignIn = async ({email, password}) => {
        console.log(email, password)
        try{
         const user = await Auth.signIn(email, password)
         console.log("login success -> ", user);

        }
        catch(err){
            console.log("error SignIn -> ", err);

        }
    }



    return (
        <SafeAreaView style={s.container}>

            <Formik
                validationSchema={SignupSchema}
                initialValues={{ email: '', password: '' }}
                onSubmit={towSignIn}>
                {({ handleChange, handleSubmit, values, errors, touched, handleBlur }) => {
                    return (
                        <View style={s.formContainer}>
                            <Image source={images.logo} style={{ flex: 1, width: '50%', height: 25, alignSelf: 'center' }} resizeMode='contain' />

                            <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>
                                <View style={{ marginVertical: '8%' }}>
                                    <AnimatedInput
                                        placeholder='Email'
                                        value={values.email}
                                        keyboardType='email-address'
                                        onChangeText={handleChange('email')}
                                        errors={touched.email && errors.email}
                                    />
                                </View>
                                <View style={{ marginVertical: '8%' }}>
                                    <AnimatedInput
                                        buttonRight='Forgot password?'
                                        //TODO: actionButtonRight={() => navigation.dispatch(NavigateToPasswordRecovery())} 
                                        placeholder='Password'
                                        maxLength={12}
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        errors={touched.password && errors.password}
                                        secureTextEntry
                                    />
                                </View>
                            </View>

                            <View style={{ marginTop: 25 }}>
                                <LoginButton
                                    title='Login'
                                    onPress={handleSubmit}
                                />
                            </View>

                        </View>
                    )
                }}
            </Formik>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                <View style={{ color: 'gray', height: 2, width: '45%', backgroundColor: 'gray' }} />
                <Text style={{ fontSize: 16, color: 'gray', marginHorizontal: 5, fontFamily: fonts.Arial }}>OR</Text>
                <View style={{ color: 'gray', height: 2, width: '45%', backgroundColor: 'gray' }} />
            </View>

            <View style={{ flex: 1 }}>

                <View style={{ marginBottom: '7%' }}>
                    <LoginButton
                        title='Login With Facebook'
                        colors={['#5A7ABF', '#5274BC']}
                        icon={images.login.facebook}
                        onPress={onFacebookButtonPress}
                    />
                </View>

                <View style={{ marginBottom: '7%' }}>
                    <LoginButton
                        title='Login With Google'
                        icon={images.login.google}
                        colors={['#C2C2C2', '#BDBDBD']}
                        onPress={onGoogleButtonPress}
                    />
                </View>


                {isIOS && (
                    <View style={{ marginBottom: '7%' }}>
                        <LoginButton
                            title='Sign in with Apple'
                            textStyle={{ fontSize: 20, fontFamily: fonts.Arial }}
                            icon={images.login.apple}
                            colors={['#000000', '#000000']}
                            onPress={onAppleButtonPress}
                        />
                    </View>
                )}
                <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <CText style={{ color: colors.$black_50, }}>Dont have an account?</CText>
                        <TextButton
                            title='Sign Up'
                            onPress={navigateToSignup} //TODO:// navigateToSignup
                            style={{
                                textDecorationLine: 'underline',
                                color: colors.$app_red,
                                marginLeft: 10
                            }}
                        />
                    </View>

                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <CText style={{ color: colors.$black_50, }}>By creating an account, I accept ToWheel's</CText>
                        <TextButton
                            title='Terms of Service'
                            // onPress={}//TODO:// navigateToTerms
                            style={{
                                textDecorationLine: 'underline',
                                color: colors.$app_red,
                                marginTop: 0,
                                marginBottom: 0,
                            }}
                        />
                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
}

export default SigninForm;

const s = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%',
        alignSelf: 'center',
        marginBottom: 10,
    },
    formContainer: {
        flex: 1,
    }
});