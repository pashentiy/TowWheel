import {
    StyleSheet,
} from 'react-native';
import { Mixins, Spacing, Typography } from '../../styles'

const styles = ({ Colors }) => (StyleSheet.create({
    fullHeightContainer: {
        height: Mixins.DEVICE_HEIGHT,
        flex: 0,
        backgroundColor: Colors.black
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        zIndex: 999,
        top: 0,
        left: 0,
        width: '100%'
    },
    hamburger: {
        width: Mixins.scaleSize(40),
        height: Mixins.scaleSize(40),
        resizeMode: 'contain',
        margin: Spacing.SCALE_10
    },
    map:{
        width: '100%',
        alignSelf: 'center',
        borderRadius: 20,
        height: Mixins.scaleSize(200),
        overflow: 'hidden'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0
    },
    modalView: {
        width: '100%',
        backgroundColor: Colors.background,
        borderRadius: 5,
        padding: Spacing.SCALE_15,
        alignItems: 'center',
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    popupText: {
        textAlign: 'center',
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.primary
    },
    popupButton: {
        backgroundColor: Colors.primary,
        borderRadius: 10,
        padding: Spacing.SCALE_10,
        marginTop: Spacing.SCALE_10
    },
    popupButtonText: {
        color: Colors.background,
        fontSize: Typography.FONT_SIZE_16
    },
    marker: {
        //width: 20,
        //height: 20,
    },
    markerImage: {
        width: Mixins.scaleSize(30),
        height: Mixins.scaleSize(30),
        resizeMode: 'contain',
        transform: [{
            rotate: '270deg'
        }]
    },
    content:{
        backgroundColor: Colors.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: Spacing.SCALE_10,
        overflow: 'hidden'
    },
    popupTitle: {
        fontSize: Typography.FONT_SIZE_15,
        color: Colors.text,
        fontWeight: 'bold',
        marginBottom: Spacing.SCALE_5
    },
    avatarGif:{
        resizeMode: 'contain',
        width: Mixins.scaleSize(150),
        height: Mixins.scaleSize(150)
    },
    towImage:{
        resizeMode: 'contain',
        width: Mixins.scaleSize(60),
        height: Mixins.scaleSize(60)
    },
    locationTitle:{
        fontSize: Typography.FONT_SIZE_12,
        color: Colors.muted_text
    },
    location:{
        fontSize: Typography.FONT_SIZE_12,
        color: Colors.black,
        marginRight: Spacing.SCALE_10
    },
    vehicleName:{
        fontSize: Typography.FONT_SIZE_12,
        color: Colors.muted_text,
        fontWeight: 'bold'
    },
    value:{
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.black,
    },
    symbol:{
        fontSize: Typography.FONT_SIZE_12,
        color: Colors.black,
        fontWeight: 'bold'
    },
    selected:{
        backgroundColor: Colors.grey
    },
    continueButton:{
        backgroundColor: Colors.black,
        padding: Spacing.SCALE_8,
        borderRadius: 10,
        alignItems: 'center',
        width: Mixins.scaleSize(300)
    },
    continueButtonIcon:{
        marginLeft: Spacing.SCALE_10,
        marginRight: Spacing.SCALE_10,
        backgroundColor: Colors.secondary20,
        width: Mixins.scaleSize(30),
        height: Mixins.scaleSize(30),
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    continueButtonText:{
        fontSize: Typography.FONT_SIZE_18,
        color: Colors.white,
        flex: 1,
        textAlign: 'center'
    },
})
);

export default styles