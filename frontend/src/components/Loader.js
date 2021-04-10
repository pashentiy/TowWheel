import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Easing,
  Dimensions,
  ActivityIndicator,
  Image
} from 'react-native';
import {Spacing, Mixins } from 'src/styles'
import { useTheme } from 'src/hooks'

const Loader=()=>{
  const [Colors, styles] = useTheme(style)
	return (
		<View style={styles.backgroundContainer}>
			<ActivityIndicator size="large" color={Colors.primary} />
		</View>
    );
}

const style = ({Colors})=>(StyleSheet.create({
  backgroundContainer: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.2)",
      position: "absolute",
      width: Mixins.DEVICE_WIDTH,
      height: Mixins.DEVICE_HEIGHT + Mixins.STATUSBAR_HEIGHT,
      zIndex: 99
  },
})
);

export default  Loader 



