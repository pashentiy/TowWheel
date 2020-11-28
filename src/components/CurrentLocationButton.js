import React from 'react';
import { View, StyleSheet,Dimensions,TouchableOpacity,} from 'react-native';

const WIDTH= Dimensions.get('Window').width;
const HEIGHT= Dimensions.get('Window').height;
export const CurrentLocationButton =function(props){
    const cb =props.cb?props.cb:()=> console.log('callback function not passed');
    const bottom =props.bottom? props.bottom:65;
    return(
        <View style={[styles.container,{top:HEIGHT.bottom}]}>
        <TouchableOpacity onPress={()=>{cb()}}>
        </TouchableOpacity>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        zIndex:9,
        position:'absolute',
        width:45,
        height:45,
        backgroundColor:'#fff',
        left:WIDTH-70,
        borderRadius:50,
        shadowColor:'#000000',
        elevation:7,
        shadowRadius:5,
        shadowOpacity:1.0,
        justifyContent:'space-around',
        alignItems:'center',
    },
}

)