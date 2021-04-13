import {
    StyleSheet,
} from 'react-native';
import { Mixins, Spacing, Typography } from '../../styles'

const style = ({ Colors }) => (StyleSheet.create({
    logo: {
        resizeMode: 'contain',
        width: Mixins.scaleSize(200),
        height: Mixins.scaleSize(250),
    },
    title: {
        fontSize: Typography.FONT_SIZE_20,
        color: Colors.text,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.text,
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0
    },
    popup: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
        width: Mixins.scaleSize(300),
        height: Mixins.scaleSize(400),
        borderRadius: 10,
        padding: Spacing.SCALE_10
    },
    inputContainer: {
        width: Mixins.scaleSize(250),
        height: Mixins.scaleSize(45),
        marginTop: Spacing.SCALE_20,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 10,
        padding: Spacing.SCALE_8,
        flexDirection: 'row',
        /*shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,*/
        backgroundColor: Colors.background,
        alignItems: 'center'
    },
    flag: {
        width: Mixins.scaleSize(20),
        height: Mixins.scaleSize(20),
        marginRight: Spacing.SCALE_15,
    },
    inputText:{
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.text
    },
    countryCode:{
        marginRight: Spacing.SCALE_5,
        color: Colors.muted_text
    },
    inputNumber:{
        flex: 1,
        paddingHorizontal: 0,
        paddingVertical: 0,
        fontSize: Typography.FONT_SIZE_14,
    },
    button:{
        width: Mixins.scaleSize(250),
        height: Mixins.scaleSize(45),
        marginTop: Spacing.SCALE_20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 50
    },
    buttonText:{
        fontSize: Typography.FONT_SIZE_18,
        color: Colors.white
    },
    otpInputContainer:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: Spacing.SCALE_2,
        marginTop: Spacing.SCALE_30,
        marginBottom: Spacing.SCALE_10
    },
    otpBoxEmpty:{
        backgroundColor: Colors.grey,
        margin: 0,
        borderRadius: 6,
        width: 50,
        height: 50,
        textAlign: 'center',
        fontSize: Typography.FONT_SIZE_18,
        color: Colors.black
    },
    otpBoxFilled:{
        backgroundColor: Colors.primary,
        margin: 0,
        borderRadius: 6,
        width: 50,
        height: 50,
        textAlign: 'center',
        fontSize: Typography.FONT_SIZE_18,
        color: Colors.white
    },
})
);


export default style