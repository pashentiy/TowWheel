import {
    StyleSheet,
} from 'react-native';
import { Mixins, Spacing, Typography } from 'src/styles'

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
        marginBottom: Spacing.SCALE_5
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
    renderItem:{
        alignItems: 'center',
        justifyContent: 'center',
        width: Mixins.scaleSize(170),
        borderWidth: 0.5,
        borderColor: Colors.grey,
        borderRadius: 10,
        paddingVertical: Spacing.SCALE_5
    },
    dp:{
        width: Mixins.scaleSize(50),
        height: Mixins.scaleSize(50),
        backgroundColor: Colors.grey,
        borderRadius: 100
    },
    itemName:{
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.black,
        marginVertical: Spacing.SCALE_5
    },
    currency:{
        fontSize: Typography.FONT_SIZE_20,
        fontWeight: 'bold'
    },
    cost:{
        fontSize: Typography.FONT_SIZE_23,
        color: Colors.primary
    },
    rating:{
        position:'absolute',
        right: Spacing.SCALE_10,
        top: Spacing.SCALE_10,
        padding: Spacing.SCALE_4,
        backgroundColor: Colors.secondary_very_light,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ratingValue:{
        color: Colors.primary,
        fontSize: Typography.FONT_SIZE_14
    }
})
);


export default style