import { View, Text, Image, StyleSheet, Pressable, Modal } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect, useMemo } from 'react';
import { usePostReservation } from '../src/useHooks/useReservations';
import { useTheme } from '../ThemeContext';
import { Checkout } from 'components/Chekout';
export default function EventDetail() {
  const { theme } = useTheme();
  const { _id, name, category, location, date, image, tickets } = useLocalSearchParams();
  const ticketsParseados = JSON.parse(tickets);
  const fechaFormateada = new Date(date).toLocaleDateString('es-CL');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cantidades, setCantidades] = useState(Array(ticketsParseados.length).fill(0));
  const [reservacionActual, setReservacionActual] = useState(null);
  const { post, data, loading, error } = usePostReservation();

  const potencialReserva = useMemo(
    () => ({
      event_id: _id,
      items: cantidades
        .map((cantidad, i) => ({
          quantity: cantidad,
          type: ticketsParseados[i].type,
        }))
        .filter((item) => item.quantity > 0),
    }),
    [cantidades, ticketsParseados]
  );

  const incrementar = (index) => {
    setCantidades((prev) => prev.map((q, i) => (i === index ? q + 1 : q)));
  };

  const decrementar = (index) => {
    setCantidades((prev) => prev.map((q, i) => (i === index ? Math.max(q - 1, 0) : q)));
  };

  const handleReservation = async () => {
    // 1. VALIDACIÓN PRIMERO (¡Muy bien hecho mover esto arriba!)
    if (potencialReserva.items.length === 0) {
      alert('No has elegido tickets');
      return;
    }

    try {
      const resultado = await post(potencialReserva);
      if (resultado) {
        setReservacionActual(resultado); // Guardamos el ID para el Checkout
        setIsModalVisible(true); // AHORA sí abrimos el modal
      }
    } catch (err) {
      console.warn(err); // Para que tú veas el error en consola
      alert('Error al crear reserva: ' + (err.message || 'Intenta de nuevo'));
    }
  };

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{name}</Text>
      <View style={styles.categoryContainer}>
        <MaterialIcons name="music-note" size={17} color={theme === 'light' ? 'black' : 'white'} />
        <Text style={styles.text}>{category}</Text>
      </View>
      <View style={styles.categoryContainer}>
        <MaterialIcons name="place" size={17} color={theme === 'light' ? 'black' : 'white'} />
        <Text style={styles.text}>{location}</Text>
      </View>
      <View style={styles.categoryContainer}>
        <MaterialIcons name="event" size={17} color={theme === 'light' ? 'black' : 'white'} />
        <Text style={styles.text}>{fechaFormateada}</Text>
      </View>
      <View style={styles.ticketInfo}>
        {ticketsParseados.map((ticket, i) => (
          <View key={i}>
            <View style={styles.ticketIndv}>
              <Text style={{ color: theme === 'light' ? 'black' : 'white' }}>{ticket.type}</Text>
              <Text style={{ color: theme === 'light' ? 'black' : 'white' }}>
                ¡Quedan {ticketsParseados[i].available}!
              </Text>
              <Text>
                <Pressable style={styles.addButton} onPress={() => decrementar(i)}>
                  <Text style={styles.buttonText}>-</Text>
                </Pressable>
                {cantidades[i]}
                <Pressable style={styles.addButton} onPress={() => incrementar(i)}>
                  <Text style={styles.buttonText}>+</Text>
                </Pressable>
              </Text>
            </View>
            <View style={styles.divider} />
          </View>
        ))}
      </View>
      <Pressable style={styles.reservationButton} onPress={handleReservation}>
        <Text style={styles.buttonText}>Reservar</Text>
      </Pressable>
      <Modal transparent visible={isModalVisible} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.bottomSheet}>
            <Checkout reservationID={reservacionActual} onClose={setIsModalVisible} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: { padding: 20, backgroundColor: theme === 'light' ? '#fff' : '#000', flex: 1 },
    image: { width: '100%', height: 250, borderRadius: 10, backgroundColor: '#0000002d' },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      marginVertical: 15,
      color: theme === 'light' ? '#000' : '#fff',
    },
    text: { fontSize: 18, marginVertical: 4, color: theme === 'light' ? '#000' : '#fff' },
    categoryContainer: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    ticketInfo: {
      width: '100%',
      backgroundColor: theme === 'light' ? '#fff' : '#1a1a1a',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme === 'light' ? 'black' : 'white',
      padding: 20,
    },
    divider: {
      width: '100%',
      height: 1,
      backgroundColor: theme === 'light' ? 'black' : 'white',
      marginVertical: 8,
    },
    ticketIndv: { flexDirection: 'row', justifyContent: 'space-between' },
    reservationButton: {
      backgroundColor: 'black',
      marginTop: 20,
      borderRadius: 10,
      padding: 10,
      width: '25%',
    },
    addButton: {
      backgroundColor: 'black',
      marginTop: 2,
      borderRadius: 5,
      padding: 1,
      width: '25%',
    },
    buttonText: { color: 'white', textAlign: 'center' },
    modalBackground: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' },
    bottomSheet: {
      height: '75%',
      backgroundColor: theme === 'light' ? '#fff' : '#1a1a1a',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
  });
