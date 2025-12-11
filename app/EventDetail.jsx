import { View, Text, Image, StyleSheet, Pressable, Modal, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useMemo } from 'react';
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
  const { post } = usePostReservation();

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
    setCantidades((prev) =>
      prev.map((q, i) => {
        if (i === index) {
          if (q < ticketsParseados[i].available) {
            return q + 1;
          } else {
            console.log('Maximo');
            Alert.alert(
              'Maximo de boletos alcanzados',
              `Solo quedan ${ticketsParseados[i].available} boletos tickets disponibles`
            );
            return q;
          }
        }
        return q;
      })
    );
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
        setReservacionActual(resultado);
        setIsModalVisible(true);
      }
    } catch (err) {
      alert('Error al crear reserva');
    }
  };

  const styles = getStyles(theme);

  const getTicketColor = (cantidad) => {
    if (cantidad === 0) return theme === 'light' ? '#999' : '#555';
    if (cantidad <= 2) return '#4caf50ff';
    if (cantidad <= 4) return '#ffc107ff';
    return '#ff5252ff';
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollArea}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>

        <Text style={styles.title}>{name}</Text>

        <View style={styles.categoryContainer}>
          <MaterialIcons
            name="music-note"
            size={17}
            color={theme === 'light' ? 'black' : 'white'}
          />
          <Text style={styles.text}>
            <Text style={{ fontWeight: 800 }}>Categoría: </Text>
            {category}
          </Text>
        </View>

        <View style={styles.categoryContainer}>
          <MaterialIcons name="place" size={17} color={theme === 'light' ? 'black' : 'white'} />
          <Text style={styles.text}>
            <Text style={{ fontWeight: 800 }}>Lugar: </Text>
            {location}
          </Text>
        </View>

        <View style={styles.categoryContainer}>
          <MaterialIcons name="event" size={17} color={theme === 'light' ? 'black' : 'white'} />
          <Text style={styles.text}>
            <Text style={{ fontWeight: 800 }}>Fecha: </Text>
            {fechaFormateada}
          </Text>
        </View>

        <View style={styles.ticketInfo}>
          {ticketsParseados.map((ticket, i) => (
            <View key={i}>
              <View style={styles.ticketIndv}>
                <MaterialIcons
                  name="confirmation-number"
                  size={20}
                  color={getTicketColor(cantidades[i])}
                />

                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text
                    style={{
                      color: theme === 'light' ? '#111' : '#fff',
                      fontSize: 15,
                      fontWeight: '600',
                    }}>
                    {ticket.type}
                  </Text>

                  <Text
                    style={{
                      color: theme === 'light' ? '#777' : '#bbbbbb',
                      fontSize: 12,
                      marginTop: 2,
                    }}>
                    Stock: {ticket.available}
                  </Text>
                </View>

                <View style={styles.addButtonContainer}>
                  <Pressable style={styles.addButton} onPress={() => decrementar(i)}>
                    <Text style={styles.buttonText}>-</Text>
                  </Pressable>

                  <Text
                    style={{
                      color: theme === 'light' ? '#000' : '#FFF',
                      marginHorizontal: 8,
                      borderWidth: 1,
                      borderColor: theme === 'light' ? '#E5E5E5' : '#222222',
                      borderRadius: 4,
                      paddingHorizontal: 10,
                      paddingVertical: 3,
                    }}>
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
      </View>

      <Pressable style={styles.fixedButton} onPress={handleReservation}>
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
      backgroundColor: theme === 'light' ? '#f9f9f9ff' : '#000000e5',
      flex: 1,
    },

    scrollArea: {
      flex: 1,
      paddingBottom: 120,
    },

    image: {
      width: '120%',
      height: 260,
      backgroundColor: '#0000004f',
      borderWidth: 1,
      borderColor: theme === 'light' ? '#e9e9e9ff' : '#222222',
    },

    imageContainer: {
      width: '100%',
      marginHorizontal: -20,
      marginTop: -20,
    },

    title: {
      fontSize: 27,
      fontWeight: '700',
      color: theme === 'light' ? '#111' : '#eeeeeeff',
      marginBottom: 10,
      marginTop: 10,
    },

    text: {
      fontSize: 16,
      color: theme === 'light' ? '#333' : '#ddddddff',
    },

    categoryContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
      marginVertical: 1,
      opacity: 0.9,
    },

    ticketInfo: {
      width: '100%',
      backgroundColor: theme === 'light' ? '#ffffffff' : '#111111',
      borderRadius: 16,
      padding: 20,
      marginTop: 15,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
      borderWidth: 1,
      borderColor: theme === 'light' ? '#e5e5e5' : '#222222',
    },

    ticketIndv: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 5,
    },

    divider: {
      width: '100%',
      height: 1,
      backgroundColor: theme === 'light' ? '#e0e0e0ff' : '#222',
      marginVertical: 6,
    },

    addButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },

    addButton: {
      backgroundColor: theme === 'light' ? '#1a1a1aff' : '#ffffffff',
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 6,
      marginHorizontal: 1,
    },

    buttonText: {
      color: theme === 'light' ? '#ffffffff' : '#000',
      fontWeight: '600',
      textAlign: 'center',
    },

    fixedButton: {
      position: 'absolute',
      bottom: 50,
      left: 20,
      right: 20,
      backgroundColor: theme === 'light' ? '#111' : '#ffffffff',
      padding: 16,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 6,
    },

    modalBackground: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.35)',
    },

    bottomSheet: {
      height: '75%',
      backgroundColor: theme === 'light' ? '#ffffffff' : '#111',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 20,
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 8,
    },
  });
