import {
    StyleSheet,
} from 'react-native';
import { Mixins, Spacing, Typography } from '../../styles'

const styles = ({Colors})=>(StyleSheet.create({
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        zIndex: 999,
        top: 0,
        left: 0,
        width: '100%'
    },
    hamburger:{
        width: Mixins.scaleSize(40),
        height: Mixins.scaleSize(40),
        resizeMode: 'contain',
        margin: Spacing.SCALE_10
    },
    searchContainer:{
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
        padding: Spacing.SCALE_10
    },
    searchInput:{
        flex: 1,
        fontSize: Typography.FONT_SIZE_18
    }
})
);

export default styles