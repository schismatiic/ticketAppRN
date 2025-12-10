import { useEffect, useState } from 'react';
import { Pressable, View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../ThemeContext';
import { usePurchase } from '@/useHooks/usePurchases';
import { useGetbyId } from '@/useHooks/useEvents';
// queria usar eventcard para esto pero lo complicaria mucho asi que es mas facil crear un componente nuevo
const height = Dimensions.get('window').height;

export default function BuyCard({ _id }) {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const { getPurchaseById, data, loading } = usePurchase();

  useEffect(() => {
    getPurchaseById(_id);
  }, [_id]);
  if (data) {
    return (
      <Pressable style={styles.container}>
        <View style={styles.row}>
          <Text
            style={{
              color: theme === 'light' ? '#000' : '#fff',
              padding: 8,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            ID:
          </Text>
          <Text style={styles.id_text}>{_id}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.price_container}>
            <Text style={styles.text}>${data.total_price}</Text>
          </View>
        </View>
      </Pressable>
    );
  }
}
const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      borderTopWidth: height / 256,
      borderTopColor: 'orange',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      display: 'flex',
      flexDirection: 'column',
      margin: 12,
      borderRadius: 10,
      width: '90%',
      height: height / 6,
      backgroundColor: theme === 'light' ? '#dbdbdb' : '#1e1e1e',
    },
    row: {
      flexDirection: 'row',
    },
    text: {
      color: theme === 'light' ? '#000' : '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      justifyContent: 'center',
    },
    id_text: { color: theme === 'light' ? '#000' : '#fff', paddingTop: 8, fontSize: 17 },
    price_container: {
      margin: 12,
      backgroundColor: theme === 'light' ? '#cacaca' : '#2e2e2e',
      marginLeft: 'auto',
      marginTop: 'auto',
      paddingHorizontal: 16, // 👈 más grande = más ancho que el texto
      paddingVertical: 8, // 👈 más alto que el texto
      borderRadius: 8,
    },
  });
