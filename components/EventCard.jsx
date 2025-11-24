import { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';

const height = Dimensions.get('window').height;
// no me funciono tailwind muy bien asi que lo hice asi
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

export default function EventCard({ name, category, location, date, image }) {
  //formatear titulo
  // cambiamos la imagen a esto si no hay https://placehold.co/600x400?text=No+picture
  const [picture, setPicture] = useState('');
  const [title, setTitle] = useState('');

  const fechaFormateada = new Date(date).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    // Formateamos el titulo para que este bonito
    const toTitle = (str) => {
      return str
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };
    console.log(image);
    if (image.length < 1 || image === null) {
      console.log('DEBUG no hay imagen');
      setPicture('https://placehold.co/600x400?text=No+picture'); //creo que esta api me
    } else {
      setPicture(image);
    }
    setTitle(toTitle(name));
  }, [name, image]);

  return (
    <View className="flex-row" style={styles.container}>
      <Image
        style={styles.eventPicture}
        source={{
          uri: picture,
        }}
      />
      <View style={styles.eventText}>
        <Text style={styles.eventTitle} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
        <View className="category">
          <Text numberOfLines={1} ellipsizeMode="tail">
            {category}
          </Text>
          <Text>{fechaFormateada}</Text>
        </View>
        <View className="location" style={styles.eventLocation}>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {location}
          </Text>
        </View>
      </View>
    </View>
  );
}

// mas que nada faltaria agregar los iconos aca pero tu le sabes
