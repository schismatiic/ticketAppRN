import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function EventDetail() {
  const { name, category, location, date, image } = useLocalSearchParams();
  const fechaFormateada = new Date(date).toLocaleDateString('es-CL');
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
        <View style={styles.ticketIndv}>
          <Text>General</Text>
          <Text>2</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.ticketIndv}>
          <Text>Cristofer</Text>
          <Text>0</Text>
        </View>
      </View>
      <Pressable style={styles.reservationButton}>
        <Text style={styles.buttonText}>Reservar</Text>
      </Pressable>
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
  buttonText: {
    color: 'white',
  },
});
