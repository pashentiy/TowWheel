import React from 'react';
import { View, SafeAreaView, StyleSheet, Image } from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';

import AnimatedInput from '../../components/AnimatedInput';
import SignupButton from '../../components/Button';

import CText from '../../components/CText';
import TextButton from '../../components/TextButton';
import { colors } from '../../utilities';
import images from '../../utilities/images';
import { NavigateToSignin, NavigateToTerms } from '../../navigation/NavigationActions';
import { useNavigation } from '@react-navigation/native';


const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email address must be valid')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'At least 6 characters length.')
        .max(12, 'Password must be between 6 and 12 characters length.')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .required('Confrim password is required')
        .oneOf([Yup.ref('password')], "Both password need to be the same.")
});

const SignupForm = (props) => {
    const navigation = useNavigation();

    const onSubmit = (values) => {
        // dispatch(authActions.signUpWithCallon(values));
    }


    // const navigateToTerms = () => {
    //     navigation.dispatch(NavigateToTerms());

    // }

    return (
        <SafeAreaView style={s.formContainer}>
            <Formik
                validationSchema={SignupSchema}
                initialValues={{ email: '', password: '', confirmPassword: '' }}
                onSubmit={() => {}}>
                {({ handleChange, handleSubmit, handleBlur, values, errors, touched, ...rest }) => {
                    return (
                        <>
                            <View style={{ flex: 1, width: '80%', alignSelf: 'center' }}>
                                <Image
                                    source={images.logo}
                                    style={{ width: '50%', height: 25, marginVertical: 20, alignSelf: 'center' }}
                                    resizeMode='contain'
                                />

                                <View style={{ marginVertical: '8%' }}>
                                    <AnimatedInput
                                        placeholder='Email'
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        errors={touched.email && errors.email}
                                    />
                                </View>

                                <View style={{ marginVertical: '8%' }}>
                                    <AnimatedInput
                                        placeholder='Password'
                                        value={values.password}
                                        maxLength={12}
                                        onChangeText={handleChange('password')}
                                        errors={touched.password && errors.password}
                                        secureTextEntry
                                    />
                                </View>

                                <View style={{ marginVertical: '8%' }}>
                                    <AnimatedInput
                                        placeholder='Confirm Password'
                                        value={values.confirmPassword}
                                        maxLength={12}
                                        onChangeText={handleChange('confirmPassword')}
                                        errors={errors.confirmPassword}
                                        secureTextEntry
                                    />
                                </View>

                                <View style={{ marginTop: 25 }}>
                                    <SignupButton
                                        title='Sign up'
                                        onPress={handleSubmit} />
                                </View>



                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 10 }}>
                                    <CText style={{ color: colors.$black_50, }}>Already have an account?</CText>
                                    <TextButton
                                        title='Sign in'
                                        onPress={() => navigation.goBack()}
                                        style={{
                                            textDecorationLine: 'underline',
                                            color: colors.$app_red,
                                            marginLeft: 10
                                        }}
                                    />
                                </View>
                                <CText style={{ color: colors.$black_50, }}>By creating an account, I accept CallOn's</CText>
                                <TextButton
                                    title='Terms of Service'
                                    onPress={() => {}}
                                    style={{
                                        textDecorationLine: 'underline',
                                        color: colors.$app_red,
                                        marginTop: 0,
                                        marginBottom: 0,
                                    }}
                                />
                            </View>
                        </>
                    )
                }}
            </Formik>
        </SafeAreaView>
    );
}

export default SignupForm;

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        flex: 1,
    }
});