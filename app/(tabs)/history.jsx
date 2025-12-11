import { View, Text, FlatList, StyleSheet, ScrollView, Modal } from 'react-native';
import useLoad from '@/useHooks/useLoad';
import { useTheme } from '../../ThemeContext';
import BuyCard from 'components/BuyCard';
import { useCallback } from 'react';
import { useFocusEffect } from 'expo-router';

export default function History() {
  const { theme } = useTheme();
  const { data, getData } = useLoad();
  const styles = getStyles(theme);
  // cargamos los datos cada vez que se abre la tab
  useFocusEffect(
    useCallback(() => {
      getData(); // ⬅️ se ejecuta cada vez que vuelves a la tab
    }, [])
  );

  console.log(data);
  return (
    <ScrollView style={styles.container}>
      {data && data.map((id) => <BuyCard key={id} _id={id} />)}
    </ScrollView>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#fff' : '#000',
    },
  });
