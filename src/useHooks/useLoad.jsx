import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export default function useLoad() {
  const [data, setData] = useState(null);
  // cargamos "key" del local storage
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('key');
        setData(jsonValue != null ? JSON.parse(jsonValue) : null);
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

  return data;
}
