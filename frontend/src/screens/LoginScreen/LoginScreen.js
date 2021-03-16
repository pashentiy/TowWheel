import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SigninForm from './SigninForm';


const Login = () => {
    return (
        <View style={s.container}>
            <SigninForm />
        </View>
    )
}

export default Login;

const s = StyleSheet.create({
    container: {
        flex: 1,
    }
})