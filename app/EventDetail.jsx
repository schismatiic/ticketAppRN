import { View, Text, Image, StyleSheet, Pressable, Modal } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { usePostReservation } from "../src/useHooks/useReservations";

export default function EventDetail() {
  const { _id, name, category, location, date, image, tickets } = useLocalSearchParams();
  const ticketsParseados = JSON.parse(tickets);
  const fechaFormateada = new Date(date).toLocaleDateString('es-CL');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cantidades, setCantidades] = useState(Array(ticketsParseados.length).fill(0));
  const [ticketActual, setTicketActual] = useState(0);

  const { postReservation, data, loading, error } = usePostReservation();

  const potencialReserva = {
    event_id: _id, // el id del evento
    items: [],
  };

  useEffect(() => {
    potencialReserva.items = cantidades.map((cantidad, i) => ({
      quantity: cantidad,
      type: ticketsParseados[i].type,
    }))
  }, [cantidades]);

  const incrementar = (index) => {
    setCantidades(prev =>
      prev.map((q, i) => i === index ? q + 1 : q)
    );
  };

  const decrementar = (index) => {
    setCantidades(prev =>
      prev.map((q, i) => i === index ? Math.max(q - 1, 0) : q)
    );
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />

      <Text style={styles.title}>{name}</Text>
      <View style={styles.categoryContainer}>
        <MaterialIcons name="music-note" size={17} color="black" />
        <Text style={styles.text}>{category}</Text>
      </View>

      <View style={styles.categoryContainer}>
        <MaterialIcons name="place" size={17} color="black" />
        <Text style={styles.text}>{location}</Text>
      </View>
      <View style={styles.categoryContainer}>
        <MaterialIcons name="event" size={17} color="black" />
        <Text style={styles.text}>{fechaFormateada}</Text>
      </View>

      <View style={styles.ticketInfo}>
        {ticketsParseados.map((ticket, i) => (
          <View key={i}>
            <View style={styles.ticketIndv}>
              <Text>{ticket.type}</Text>
              <Text>¡Quedan {ticketsParseados[i].available}! </Text>
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

      <Pressable style={styles.reservationButton} onPress={async () => {
        try {
          const result = await postReservation(potencialReserva);
          console.log("Reserva creada:", result);
          alert("Reserva exitosa!");
          setIsModalVisible(true); // cerrar modal si quieres
        } catch (err) {
          alert("Ocurrió un error al crear la reserva");
        }
      }}>
        <Text style={styles.buttonText}>Reservar</Text>
      </Pressable>

      <View>
        <Modal transparent visible={isModalVisible} animationType="slide">
          <View style={styles.modalBackground}>
            <View style={styles.bottomSheet}>
              <Text>ALOALO</Text>
              <Pressable style={styles.addButton} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.buttonText}>desmostrar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  image: { width: '100%', height: 250, borderRadius: 10, backgroundColor: '#0000002d' },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  text: { fontSize: 18, marginVertical: 4 },
  categoryContainer: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ticketInfo: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    padding: 20,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    marginVertical: 8,
  },
  ticketIndv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end', // hace que el contenido se alinee abajo
    backgroundColor: 'rgba(0,0,0,0.3)', // fondo semitransparente
  },
  bottomSheet: {
    height: '75%',             // ocupa la mitad de la pantalla
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});
