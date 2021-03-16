import { Alert } from 'react-native';
import { Popup, Toast } from 'popup-ui';
import colors from './colors';

export const showInternetConnectionError = () => {
    Alert.alert('No Internet', 'It seems like you dont have an active internet connection');
}

export const showErrorPopup = (title = 'Oops...', textBody, callback) => {
    Popup.show({
        type: 'Danger',
        title,
        button: true,
        textBody,
        buttontext: 'Ok',
        callback: () => {
            callback && callback();
            Popup.hide()
        }
    })
};

export const showWarningPopup = (title = 'Oops...', textBody, callback) => {
    Popup.show({
        type: 'Warning',
        title,
        button: true,
        textBody,
        buttontext: 'Ok',
        callback: () => {
            callback && callback();
            Popup.hide()
        }
    })
};

export const showSuccessPopup = (title = 'Oops...', textBody, callback) => {
    Popup.show({
        type: 'Success',
        title,
        button: true,
        textBody,
        buttontext: 'Ok',
        callback: () => {
            callback && callback();
            Popup.hide()
        }
    })
};

export const showToast = (title, text, color = colors.$app_red) => {
    Toast.show({
        title,
        text,
        color
    })
}