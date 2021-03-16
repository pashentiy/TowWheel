import React from "react";
import MapViewDirection from "react-native-maps-directions";

const Directions = ({ destination, origin, onReady }) => (
  <MapViewDirection
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey="AIzaSyD70sNQXz0OFl8kp2yTCIS_uHDke2vo11U"
    strokeWidth={3}
    strokeColor="#DD4D5E"
  />
);

export default Directions;
