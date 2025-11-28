import { View, Text, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function EventDetail() {
  const { name, category, location, date, image } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />

      <Text style={styles.title}>{name}</Text>
      <View style={styles.categoryContainer}>
        <MaterialIcons name="music-note" size={17} color="black" />
        <Text style={styles.text}>Categoría: {category}</Text>
      </View>
      <View style={styles.categoryContainer}>
        <MaterialIcons name="event" size={17} color="black" />
        <Text style={styles.text}>Fecha: {date}</Text>
      </View>

      <View style={styles.categoryContainer}>
        <MaterialIcons name="place" size={17} color="black" />
        <Text style={styles.text}>Lugar: {location}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  image: { width: '100%', height: 250, borderRadius: 10, backgroundColor: '#0000002d' },
  title: { fontSize: 25, fontWeight: 'bold', marginVertical: 15 },
  text: { fontSize: 18, marginVertical: 4 },
  categoryContainer: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});
