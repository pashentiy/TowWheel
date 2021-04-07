import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/*
 * Hook for asyncstorage
 * const [theme, changeTheme, clearAll] = useStorage("@themeIsDark", false);
 * changeTheme(null) - to remove item
 */

const useStorage = (key) => {
    const [storageValue, updateStorageValue] = useState(null);
  
    useEffect(() => {
      getStorageValue();
    }, []);
  