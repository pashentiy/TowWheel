import React, { useState, useEffect } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Easing,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Loader, Toast, InternetConnectionPopup } from 'src/components'
import { useDdux, useNetInfo, useTheme } from 'src/hooks'
//import { ENVIRONMENT } from 'src/config'

const icons = {
  Success: ({ color }) => <Icon name="check-circle" size={30} color={color} />,
  Error: ({ color }) => <Icon name="times-circle" size={30} color={color} />,
  Info: ({ color }) => <Icon name="info-circle" size={30} color={color} />
}

const GlobalLayouts = ({ ...props }) => {
  const [Colors, styles] = useTheme()
  const Ddux = useDdux()
  const { isConnected, isInternetReachable } = useNetInfo()
  const loadinStatus = Ddux.data('loading')

  return (
    <View style={styles.flex1}>
      {props.children}
      {loadinStatus && <Loader />}
      <Toast ref={(r) => Toast.setRef(r)}
        icons={icons} />
      <InternetConnectionPopup isVisible={isConnected == false && isInternetReachable == false} />
    </View>
  );
}



const styles = StyleSheet.create({

});

export default GlobalLayouts



