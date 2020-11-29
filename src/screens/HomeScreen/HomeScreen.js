import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import{DeatinationButton} from './DeatinationButton';

const HomeScreen = () => {
  return (

        <View style={s.container}>
         <Text >Google Map</Text>
         <DeatinationButton/>
            <MapView
                region={{
                    latitude: 31.750139,
                    longitude: 35.2372,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.0025,
                  }}
            showUserLocation={true}
            showsCompass={true}
            rotateEnabled={false}
            ref={(map)=>{this.map=map}}
            style={{flex:1}}
        />
            
        </View >

    );
            }



export default HomeScreen;


const s = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      alignSelf: 'center',
  
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    balanceView: {
      marginVertical: 20
    },
    verificationView: {
      marginTop: 20
    }
  })