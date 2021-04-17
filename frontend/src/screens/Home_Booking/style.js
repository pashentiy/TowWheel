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
})
);


export default style