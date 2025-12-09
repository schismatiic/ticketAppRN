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
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
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
                Stock: {ticket.available}
              </Text>
              <View style={styles.addButtonContainer}>
                <Pressable style={styles.addButton} onPress={() => decrementar(i)}>
                  <Text style={styles.buttonText}>-</Text>
                </Pressable>

                <Text style={{ color: theme === 'light' ? '#000' : '#FFF', marginHorizontal: 8 }}>
                  {cantidades[i]}
                </Text>

                <Pressable style={styles.addButton} onPress={() => incrementar(i)}>
                  <Text style={styles.buttonText}>+</Text>
                </Pressable>
              </View>
            </View>

            {ticket.type && i < ticketsParseados.length - 1 && <View style={styles.divider} />}
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
    container: {
      padding: 20,
      backgroundColor: theme === 'light' ? '#F9F9F9' : '#0D0D0D',
      flex: 1,
    },

    image: {
      width: '120%',
      height: 260,
      backgroundColor: '#00000015',
    },

    imageContainer: {
      width: '100%',
      marginHorizontal: -20,
      marginTop: -20,
    },

    title: {
      fontSize: 27,
      fontWeight: '700',
      color: theme === 'light' ? '#111' : '#EEE',
      marginBottom: 10,
      marginTop: 10,
    },

    text: {
      fontSize: 16,
      color: theme === 'light' ? '#333' : '#DDD',
    },

    categoryContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginVertical: 4,
      opacity: 0.9,
    },

    ticketInfo: {
      width: '100%',
      backgroundColor: theme === 'light' ? '#FFFFFF' : '#111111',
      borderRadius: 16,
      padding: 20,
      marginTop: 20,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
      borderWidth: 1,
      borderColor: theme === 'light' ? '#E5E5E5' : '#222222',
    },

    ticketIndv: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
    },

    divider: {
      width: '100%',
      height: 1,
      backgroundColor: theme === 'light' ? '#E0E0E0' : '#222',
      marginVertical: 6,
    },
    addButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },

    addButton: {
      backgroundColor: theme === 'light' ? '#1A1A1A' : '#FFF',
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 6,
      marginHorizontal: 1,
    },

    buttonText: {
      color: theme === 'light' ? '#FFF' : '#000',
      fontWeight: '600',
      textAlign: 'center',
    },

    reservationButton: {
      backgroundColor: theme === 'light' ? '#111' : '#FFF',
      marginTop: 25,
      borderRadius: 14,
      padding: 14,
      width: '40%',
      alignSelf: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
      textAlign: 'center',
    },

    modalBackground: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.35)',
    },

    bottomSheet: {
      height: '75%',
      backgroundColor: theme === 'light' ? '#FFFFFF' : '#111',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 20,
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 8,
    },
  });
