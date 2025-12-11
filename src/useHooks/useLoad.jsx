import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export default function useLoad() {
  // cargamos "key" del local storage
  console.log('[DEBU]: hola soyUseLoad');
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('key');
      setData(jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch (e) {
      console.log('[DEBUG]: useLoad.jsx');
    }
  };

  return { data, getData };
}
