import React, { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

/*
 * Hook for netinfo
 * const netinfo = useNetinfo();
 * 
 */

const inititalState = {
  type: null,
  isInternetReachable: null,
  isConnected: null
};

const useNetinfo = () => {
  const [netInfo, setNetInfo] = useState(inititalState);

  onChange = newState => {
    setNetInfo(newState);
  };

  useEffect(() => {
    NetInfo.fetch().then(connectionInfo => {
      setNetInfo(connectionInfo);
    });
  }, []);

  useEffect(() => {
    const unsubscriber = NetInfo.addEventListener(onChange);

    return () => {
      unsubscriber();
    };
  }, []);

  return netInfo;
};


export default useNetinfo