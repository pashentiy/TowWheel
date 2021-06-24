import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import style from './style'
import { Typography } from '../../styles'
import Icon from 'react-native-vector-icons/Ionicons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAP_API_KEY } from '../../config'
import { useTheme } from '../../hooks'
import { hamburger } from '../../assets'

const Header = ({ _this }) => {
    const [Colors, styles] = useTheme(style)

    const navigate = ()=>{
        _this.rideDetails.ride_status == 'searching' ?
            _this.navigation.navigate('Home_Booking', { destination: _this.rideDetails.destination, source: _this.rideDetails.source })
            : _this.navigation.navigate('Home_InProgress')
    }

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => _this.navigation.toggleDrawer()}>
                <Image
                    style={styles.hamburger}
                    source={hamburger}
                />
            </TouchableOpacity>
            {!_this.rideDetails && <GooglePlacesAutocomplete
                fetchDetails={true}
                minLength={4}
                enablePoweredByContainer={false}
                enableHighAccuracyLocation={true}
                styles={{
                    textInputContainer: styles.searchContainer,
                    textInput: styles.searchInput,
                    row: styles.searchResultContainer
                }}
                placeholder='לאן לגרור ?'
                textInputProps={{ placeholderTextColor: '#33333335' }}
                onPress={(data, details = null) => {
                    _this.onDestinationSet({ name: details.name, address: details.formatted_address, location: details.geometry.location });
                }}
                query={{
                    key: GOOGLE_MAP_API_KEY,
                    language: 'en',
                }}
            />}
            {
                _this.rideDetails && <TouchableOpacity onPress={()=>navigate()} style={[styles.flexRow, styles.continueButton]}>
                    <Text style={styles.continueButtonText}>In-progress Booking</Text>
                    <View style={styles.continueButtonIcon}>
                        <Icon name='ios-arrow-forward-sharp' size={Typography.FONT_SIZE_25} color={Colors.primary} />
                    </View>
                </TouchableOpacity>
            }
        </View>
    )
}

export default Header


