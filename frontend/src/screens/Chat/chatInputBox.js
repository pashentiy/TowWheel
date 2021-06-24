import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import style from './style'
import Icon from 'react-native-vector-icons/FontAwesome';
import { AutoResizeInputBox } from '../../components'
import { useTheme } from '../../hooks'

const ChatInputBox = ({ sendMessage }) => {
    const [Colors, styles] = useTheme(style)
    const [message, setMessage] = useState('')

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 80}
            style={styles.commentInputContainer}>
            <View style={styles.commentInputContainer}>
                <AutoResizeInputBox
                    containerStyle={styles.inputBoxWrapper}
                    style={styles.inputBox}
                    onChangeText={text => setMessage(text)}
                    value={message}
                    maxNumOfLines={4}
                />

                <TouchableOpacity onPress={() => sendMessage(message, setMessage)}>
                    <View style={styles.sendButton}>
                        <Icon name='send-o' size={20} color={Colors.white} />
                    </View>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}



export default ChatInputBox


