import {
    StyleSheet,
} from 'react-native';
import { Mixins, Spacing, Typography } from '../../styles'

const styles = StyleSheet.create({
    spalshContainer:{
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems:'center'
    },
    logo:{
        width: Mixins.scaleSize(341),
        height: Mixins.scaleSize(93),
    }
});

export default styles