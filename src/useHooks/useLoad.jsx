import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export default function useLoad() {
  const [data, setData] = useState(null);
  // cargamos "key" del local storage
  useEffect(() => {
    console.log('[DEBU]: hola soyUseLoad');
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('key');
        setData(jsonValue != null ? JSON.parse(jsonValue) : null);
      } catch (e) {
        console.log('[DEBUG]: useLoad.jsx');
      }
    };
    getData();
  }, []);

  return data;
}
