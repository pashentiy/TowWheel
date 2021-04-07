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

  async function getStorageValue() {
    let value = null;
    try {
      value = JSON.parse(await AsyncStorage.getItem(key)) || '';
    } catch (e) {
    } finally {
      updateStorageValue(value);
    }
  }

  async function updateStorage(newValue) {
    try {
      if (newValue == null) {
        await AsyncStorage.removeItem(key);
      } else {
        const value = JSON.stringify(newValue);
        await AsyncStorage.setItem(key, value);
      }
    } catch (e) {
    } finally {
      updateStorageValue(newValue);
    }
  }

  async function clearStorage() {
    try {
        await AsyncStorage.clear();
    } catch (e) {
    }
  }

  return [storageValue, updateStorage, clearStorage];
};


export default useStorage