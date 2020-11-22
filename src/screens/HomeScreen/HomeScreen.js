import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';


const HomeScreen = () => {
    return (
        <View style={s.container}>
            <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems:'center' }}>
              <Text style={{ }}>Google Map</Text>
            </ScrollView>
        </View >
    );
}

export default HomeScreen;


const s = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',

    },
    balanceView: {
        marginVertical: 20
    },
    verificationView: {
        marginTop: 20
    }
})