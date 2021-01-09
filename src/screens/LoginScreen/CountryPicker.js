import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

import CountrySelection from '../../components/CountrySelection';
import { colors, fonts, images } from '../../utilities';

const CountryPicker = ({ phoneRef, selected, setSelected }) => {
    const [isVisible, setVisble] = useState(false);

    const onSelect = (country) => {
        setSelected(country)
        hideModal()
    }

    const hideModal = () => {
        setVisble(false)
    }

    const showModal = () => {
        setVisble(true)
    }

    const onFocus = () => {
        phoneRef && phoneRef.current.focus();
    }
    return (
        <View style={s.countryPickerContainer}>

            <Modal
                onModalHide={onFocus}
                onBackdropPress={hideModal}
                isVisible={isVisible}>
                <View style={s.modalWrapper}>
                    <CountrySelection action={onSelect} />
                </View>
            </Modal>

            <TouchableOpacity onPress={showModal} style={s.container}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image
                        resizeMode={'stretch'}
                        source={selected.flag ? { uri: selected.flag } : images.login.usaFlag}
                        style={s.flagImg}
                    />

                    <View style={s.countryContainer}>
                        <Text style={s.countryName}>{selected.name}</Text>
                        <Text style={s.callingCode}>(+{selected.callingCode})</Text>
                    </View>
                </View>

            </TouchableOpacity>
        </View>
    )
}

export default CountryPicker;

const s = StyleSheet.create({
    countryPickerContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.$app_red,
        borderRadius: 10,
        paddingHorizontal: 20,
    },
    modalWrapper: {
        height: '80%',
        borderRadius: 30
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    countryContainer: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
    },
    countryName: {
        justifyContent: 'flex-end',
        fontFamily: fonts.Rajdhani_Bold
    },
    callingCode: {
        justifyContent: 'flex-end',
        fontFamily: fonts.Rajdhani_Bold,
        marginLeft: 5
    },
    arrowImg: {
        width: 15,
        height: 15
    },
    flagImg: {
        borderWidth: 1,
        borderColor: colors.$black_50,
        width: 25,
        height: 15,
        alignSelf: 'center',
        marginRight: 10
    }
});