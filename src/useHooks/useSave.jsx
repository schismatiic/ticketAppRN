import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export default function useSave() {
  const storeData = async (value) => {
    try {
      // leer el json previo
      const stored = await AsyncStorage.getItem('key');
      const arr = stored ? JSON.parse(stored) : [];

      // agregamos value
      arr.push(value);

      // guarda el objeto completo
      await AsyncStorage.setItem('key', JSON.stringify(arr));
    } catch (e) {
      // Saving error
    }
  };

  return storeData;
}
