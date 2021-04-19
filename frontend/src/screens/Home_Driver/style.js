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
    }
})
);

export default styles