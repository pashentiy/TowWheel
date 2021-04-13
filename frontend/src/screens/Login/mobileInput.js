import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
} from 'react-native';
import style from './style'
import { Mixins } from '../../styles'
import Modal from 'react-native-modal';
import { KeyboardHandledView } from '../../components'
import { useTheme } from '../../hooks'
import { login, handset } from '../../assets'
import CountrySelection from './countrySelection'

const MobileInput = ({ _this }) => {
    const [Colors, styles] = useTheme(style)
    const inputEl = useRef(null)

    const onCountrySelect = (value) => {
        _this.setCountryData(value)
        _this.setIsModalVisible(false)
        setTimeout(()=>inputEl.current.focus(),1000)
    }
    return (
        <View style={styles.flex1}>
            <KeyboardHandledView offset={20}>
                <View style={styles.flex1, styles.alignCenter}>
                    <Image
                        style={styles.logo}
                        source={login}
                    />
                    <Text style={styles.title}>Get Started</Text>
                    <Text style={styles.subtitle}>Please enter mobile number to continue.</Text>
                    <TouchableWithoutFeedback onPress={() => _this.setIsModalVisible(true)} >
                        <View style={styles.inputContainer}>
                            <Image source={{ uri: _this.countryData.flag }} style={styles.flag} />
                            <Text style={styles.inputText}>{`${_this.countryData.name}  (+${_this.countryData.callingCode})`}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.inputContainer}>
                        <Image source={handset} style={styles.flag} />
                        <Text style={[styles.inputText, styles.countryCode]}>+({_this.countryData.callingCode})</Text>
                        <TextInput
                            ref={inputEl}
                            style={styles.inputNumber}
                            onChangeText={(text)=>_this.setPhone(text)}
                            value={_this.phone}
                            placeholder="Phone number"
                            placeholderTextColor={Colors.muted_text}
                            //autoFocus={true}
                            keyboardType="numeric"
                        />
                    </View>
                    <TouchableOpacity onPress={()=>_this.getVerificationCode()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Get Code</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardHandledView>
            <Modal
                style={styles.modal}
                isVisible={_this.isModalVisible}
                onBackdropPress={() => _this.setIsModalVisible(false)}
                animationInTiming={500}
                animationOutTiming={500}
                backdropTransitionInTiming={300}
                backdropTransitionOutTiming={300}>
                <View style={styles.popup}>
                    <CountrySelection action={onCountrySelect} />
                </View>
            </Modal>
        </View>
    )
}

export default MobileInput