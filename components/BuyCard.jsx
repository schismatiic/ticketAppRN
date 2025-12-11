import { useEffect, useState } from 'react';
import {
  Pressable,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../ThemeContext';
import { usePurchase } from '@/useHooks/usePurchases';
import { useGetbyId } from '@/useHooks/useEvents';
// queria usar eventcard para esto pero lo complicaria mucho asi que es mas facil crear un componente nuevo
const height = Dimensions.get('window').height;

export default function BuyCard({ _id }) {
  const [modal, setModal] = useState(false);
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { get, edata, isLoading } = useGetbyId();
  const { getPurchaseById, data, loading } = usePurchase();
  const [fecha, setFecha] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (data?.confirmed_at) {
      const fechaFormateada = new Date(data.confirmed_at).toLocaleDateString('es-CL');
      setFecha(fechaFormateada);
    }
  }, [data]);

  useEffect(() => {
    getPurchaseById(_id);
  }, [_id]);
  // tuve que modificar el hook pq ambos tenian el response con nombre data
  useEffect(() => {
    if (data?.event_id) {
      get(data.event_id);
      console.log(data);
      console.log('Data evento', edata);
    }
  }, [data]);
  //Mismo codigo de formateo de titulo de EventCard
  useEffect(() => {
    if (!edata) return; // para que no se ejecute cuando no existe

    const toTitle = (str) =>
      str
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

    setTitle(toTitle(edata.name));
  }, [edata]);

  if (data && edata) {
    return (
      <>
        <Pressable style={styles.container} onPress={() => setModal(true)}>
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
          <Text
            style={{
              color: theme === 'light' ? '#000' : '#fff',
              padding: 8,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {title}
          </Text>
          <View style={styles.row}>
            <Text style={styles.fechas}>{fecha}</Text>
            <View style={styles.price_container}>
              <Text style={styles.text}>${data.total_price}</Text>
            </View>
            <View style={styles.nextIcon}>
              <MaterialIcons name="chevron-right" size={30} color={styles.text.color} />
            </View>
          </View>
        </Pressable>
        <Modal
          visible={modal}
          animationType="slide"
          transparent
          onRequestClose={() => setModal(false)}>
          <View
            style={{
              marginTop: 'auto',
              backgroundColor: theme === 'light' ? '#fff' : '#222',
              padding: 20,
              borderRadius: 10,
              width: '100%',
              height: height / 1.5,
            }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
              Detalles de compra
            </Text>

            <Text>ID: {_id}</Text>
            <Text>Fecha: {fecha}</Text>
            <Text>Total: ${data.total_price}</Text>
          </View>
        </Modal>
      </>
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
      justifyContent: 'space-between',
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
      marginBottom: 8,
      backgroundColor: theme === 'light' ? '#cacaca' : '#2e2e2e',
      marginLeft: 'auto',
      marginTop: 'auto',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    fechas: {
      color: theme === 'light' ? '#000' : '#fff',
      marginTop: 'auto',
      padding: 12,
      fontSize: 17,
    },
    nextIcon: {
      paddingRight: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
