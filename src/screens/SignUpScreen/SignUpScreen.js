import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../utilities';

import SignupForm from './SignupForm';

const Login = () => {
    return (
        <View style={s.container}>
            <SignupForm />
        </View>
    );
}

export default Login;

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.$white
    }
});