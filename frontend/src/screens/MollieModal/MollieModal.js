import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { WebView } from 'react-native-webview';

import { colors, fonts } from '../../utilities';

const MollieModal = ({ visible, hideModal, paymenturl, setPaymentstatus }) => {
    const webviewRef = useRef(null);


    return (
        <View>
            <Modal
                animationIn='slideInUp'
                animationOut='slideOutDown'
                onBackButtonPress={() => hideModal()}
                isVisible={visible}>
                {/* Modal Container */}
                <View style={s.container}>

                    {/* Back Button */}
                    {
                        <TouchableOpacity
                            onPress={() => hideModal()}
                            activeOpacity={.7}
                            style={s.closeBtnContainer}>
                            <Text style={s.backBtn}>Cancel Payment</Text>
                        </TouchableOpacity>
                    }

                    {/* WebView  */}
                    <WebView
                        ref={webviewRef}
                        onShouldStartLoadWithRequest={({ url, ...request }) => {
                            console.log(url)
                            if (url === 'https://purchase/success') {
                                setPaymentstatus(true)
                                hideModal()
                                return false;
                            }
                            return true;
                        }}
                        onLoadEnd={(syntheticEvent) => {
                            const { nativeEvent } = syntheticEvent;
                            const url = nativeEvent.url;
                        }}
                        style={s.webView}
                        showsVerticalScrollIndicator={false}
                        source={{ uri: paymenturl }}
                    />
                </View>
            </Modal>
        </View>
    );
}

export default React.memo(MollieModal);

const s = StyleSheet.create({
    container: {
        backgroundColor: colors.$white,
        height: '85%',
        borderRadius: 20,
    },
    backBtnContainer: {
        position: 'absolute',
        borderTopEndRadius: 20,
        borderBottomStartRadius: 20,
        height: 35,
        top: 35,
        backgroundColor: 'darkgreen',
        width: 80,
        justifyContent: 'center',
        zIndex: 1,
    },
    backBtn: {
        color: colors.$white,
        fontSize: 16,
        alignSelf: 'center',
        fontFamily: fonts.MontserratBold,
        fontWeight: '500'
    },
    closeBtnContainer: {
        position: 'absolute',
        borderBottomEndRadius: 20,
        borderTopStartRadius: 20,
        height: 35,
        backgroundColor: colors.$black,
        width: 130,
        justifyContent: 'center',
        zIndex: 1,
    },
    closeBtn: {
        color: colors.$white,
        fontSize: 16,
        alignSelf: 'center',
        fontFamily: fonts.MontserratBold,
        fontWeight: '500'
    },
    webView: {
        borderRadius: 20,
        borderWidth: 3,
        margin: 10,
        paddingTop: 30,
        borderColor: colors.$black
    }
})