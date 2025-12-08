import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useClear() {
  const clear = async () => {
    try {
      await AsyncStorage.removeItem('key');
    } catch (e) {}
  };

  return clear;
}
