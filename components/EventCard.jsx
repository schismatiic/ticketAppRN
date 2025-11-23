import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 12,
    padding: 12,
    borderRadius: 12,
    color: '#666',
    width: '90%',
    height: height / 4.75,
    backgroundColor: '#eaeaea',
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  eventText: {
    paddingLeft: 8,
    flex: 1,
    flexDirection: 'column',
    padding: 4,
  },
  eventPicture: {
    width: '37.5%',
    height: '100%',
    borderRadius: 3,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventLocation: {
    marginTop: 'auto',
    marginLeft: 'auto',
  },
});

export default function EventCard() {
  return (
    <View className="flex-row" style={styles.container}>
      <Image
        style={styles.eventPicture}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      <View style={styles.eventText}>
        <Text style={styles.eventTitle} numberOfLines={2} ellipsizeMode="tail">
          Evento De Prueba Css amongus.
        </Text>
        <View className="category">
          <Text numberOfLines={1} ellipsizeMode="tail">
            Categoria.
          </Text>
        </View>
        <View className="location" style={styles.eventLocation}>
          <Text numberOfLines={1} ellipsizeMode="tail">
            Ubicacion.
          </Text>
        </View>
      </View>
    </View>
  );
}
