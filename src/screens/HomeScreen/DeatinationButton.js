import React from 'react';
import { View, Text, ScrollView, StyleSheet,Dimensions,TouchableOpacity } from 'react-native';
export const DeatinationButton=function(props){
    return(
        <TouchableOpacity onPress={()=>{}} style={styles.container}> 
        
        <View style={styles.centerCol}>
            <Text style={{frontFamily:'san=serif-thin',fontSize:21,color:'#545454'}}>asfasfsafsa</Text>
            </View> 


        </TouchableOpacity>
         
        )
}
const styles=StyleSheet.create({
    container:{
        zIndex:9,
        // position:'absolute',
        flexDirection:'row',
        height:60,
        top:110,
        left:50,
        width:'80%',
        borderRadius:2,
        backgroundColor:'white',
        alignItems:'center'
        },
        //leftCol:{
        //    flex:1,
         //   alignItems:'center',
        //},
       centerCol:{
           flex:4
       } ,
    //   rightCol:{
    //       flex:1,
   ///        borderLeftWidth:1,
  ////         borderColor:'#ededed',
  //     },
}

)