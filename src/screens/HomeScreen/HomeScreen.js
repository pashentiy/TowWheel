import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';


const HomeScreen = () => {
    return (
        <View style={s.container}>
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <View style={s.container}>
                
                </View>
            </ScrollView>
        </View>
    );
}

export default HomeScreen;

const s = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'red'
    },
    balanceView: {
        marginVertical: 20
    },
    verificationView: {
        marginTop: 20
    }
})