import {
    StyleSheet,
} from 'react-native';
import { Mixins, Spacing, Typography } from '../../styles'

const styles = ({ Colors }) => (StyleSheet.create({
    fullHeightContainer: {
        height: Mixins.DEVICE_HEIGHT,
        flex: 0
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
    searchContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        height: Mixins.scaleSize(40),
        margin: Spacing.SCALE_10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        paddingHorizontal: Spacing.SCALE_10
    },
    searchInput: {
        flex: 1,
        fontSize: Typography.FONT_SIZE_18,
    },
    searchResultContainer: {
        width: Mixins.scaleSize(280),
        marginLeft: Spacing.SCALE_10
    },
    continueButton:{
        flex: 1,
        backgroundColor: Colors.black,
        alignItems: 'center',
        height: Mixins.scaleSize(40),
        margin: Spacing.SCALE_10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingHorizontal: Spacing.SCALE_10
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
            rotate: '0deg'
        }]
    }
})
);

export default styles