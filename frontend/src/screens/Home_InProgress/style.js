import {
    StyleSheet,
} from 'react-native';
import { Mixins, Spacing, Typography } from '../../styles'

const style = ({ Colors }) => (StyleSheet.create({
    title: {
        fontSize: Typography.FONT_SIZE_18,
        color: Colors.background
    },
    bottomPopup:{
        height: Mixins.scaleSize(260),
        backgroundColor: Colors.black
    },
    curveHeader:{
        backgroundColor: Colors.background,
        height: Spacing.SCALE_30,
        width: '100%',
        borderTopRightRadius: Spacing.SCALE_38,
        borderTopLeftRadius: Spacing.SCALE_38,
        position: 'absolute',
        top: -Spacing.SCALE_30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content:{
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: Spacing.SCALE_10
    },
    popupTitle: {
        fontSize: Typography.FONT_SIZE_15,
        color: Colors.text,
        fontWeight: 'bold',
        marginBottom: Spacing.SCALE_5,
        textAlign: 'center'
    },
    towImageContainer:{
        backgroundColor: Colors.white,
        borderRadius: Spacing.SCALE_10,
        padding: Spacing.SCALE_5,
        alignItems: 'center',
        justifyContent: 'center',
        width: Mixins.scaleSize(100)
    },
    towImageContainerSelected:{
        borderWidth: 2,
        borderColor: Colors.primary
    },
    towName:{
        fontSize: Typography.FONT_SIZE_12,
        color: Colors.muted_text
    },
    towImage:{
        resizeMode: 'contain',
        width: Mixins.scaleSize(40),
        height: Mixins.scaleSize(40)
    },
    locationTitle:{
        fontSize: Typography.FONT_SIZE_12,
        color: Colors.muted_text
    },
    location:{
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.black,
        marginRight: Spacing.SCALE_10
    },
    continueButton:{
        backgroundColor: Colors.black,
        padding: Spacing.SCALE_8,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: Spacing.SCALE_8,
        marginTop: Spacing.SCALE_6
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
    avatarGif:{
        resizeMode: 'contain',
        width: Mixins.scaleSize(100),
        height: Mixins.scaleSize(100)
    },
    distance:{
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.black,
        fontWeight: 'bold'
    },
    headerDistanceTime:{
        paddingBottom: Spacing.SCALE_5,
        marginBottom: Spacing.SCALE_5,
        borderBottomWidth: 1,
        borderColor: Colors.grey
    },
    callChatButton:{
        backgroundColor: Colors.black,
        padding: Spacing.SCALE_3,
        borderRadius: 100,
        alignItems: 'center',
        marginHorizontal: Spacing.SCALE_8,
    },
    badge:{
        backgroundColor: Colors.black,
        borderWidth: 2,
        borderColor: Colors.primary,
        borderRadius: Spacing.SCALE_30,
        width: Mixins.scaleSize(25),
        height: Mixins.scaleSize(25),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: -15,
        top: -15
    },
    badgeText:{
        color: Colors.white,
        fontSize: Typography.FONT_SIZE_14
    },
    callChatButtonIcon:{
        backgroundColor: Colors.secondary20,
        width: Mixins.scaleSize(40),
        height: Mixins.scaleSize(40),
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    marker: {
        width: Mixins.scaleSize(35),
        height: Mixins.scaleSize(35),
        justifyContent: 'center',
        alignItems: 'center'
    },
    markerImage: {
        width: Mixins.scaleSize(35),
        height: Mixins.scaleSize(20),
        resizeMode: 'stretch'
    }
})
);


export default style