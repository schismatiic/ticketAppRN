import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export default function useSave(value) {
  // guardamos la id en el objeto "key"
  useEffect(() => {
    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('key', jsonValue);
      } catch (e) {
        // saving error
      }
    };
    if (value) {
      storeData(value);
    }
  }, [value]);
}
