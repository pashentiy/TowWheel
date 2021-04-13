import {
    StyleSheet,
} from 'react-native';
import { Mixins, Spacing, Typography } from '../../styles'

const styles = StyleSheet.create({
    logo:{
        resizeMode: 'contain',
        width: Mixins.scaleSize(250),
        height: Mixins.scaleSize(70),
    }
});

export default styles