import { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import noPicture from '../assets/noPicture.png';
import { MaterialIcons } from '@expo/vector-icons'; // import para íconos :D
const height = Dimensions.get('window').height;

export default function EventCard({ name, category, location, date, image }) {
  //formatear titulo
  // cambiamos la imagen a esto si no hay https://placehold.co/600x400?text=No+picture
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState('');
  const [loc, setLoc] = useState('');
  const [cat, setCat] = useState(''); //hacemos lo mismo con la ubicacion y la categoria pq john react me dijo

  const fechaFormateada = new Date(date).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  useEffect(() => {
    // Formateamos el titulo para que este bonito
    const toTitle = (str) => {
      if (str.endsWith('.')) {
        return str
          .toLowerCase()
          .trim()
          .split(/\s+/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      } else {
        return (
          str
            .toLowerCase()
            .trim()
            .split(/\s+/)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ') + '.'
        );
      }
    };
    console.log(image);
    if (image === '') {
      console.log('DEBUG no hay imagen');
      setPicture(noPicture); //creo que esta api me
    } else {
      setPicture({ uri: image });
    }
    setTitle(toTitle(name));
    setLoc(toTitle(location));
    setCat(toTitle(category));
  }, [name, image, location, category]);

  return (
    <View className="flex-row" style={styles.container}>
      <Image style={styles.eventPicture} source={picture} />
      <View style={styles.eventText}>
        <Text style={styles.eventTitle} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
        <View className="category">
          <View style={styles.categoryContainer}>
            <MaterialIcons name="music-note" size={17} color="black" />
            <Text numberOfLines={1} ellipsizeMode="tail">
              {cat}
            </Text>
          </View>
          <View style={styles.categoryContainer}>
            <MaterialIcons name="event" size={17} color="black" />
            <Text>{fechaFormateada}</Text>
          </View>
        </View>
        <View className="location" style={styles.eventLocation}>
          <View style={styles.categoryContainer}>
            <MaterialIcons name="place" size={17} color="black" />
            <Text numberOfLines={1} ellipsizeMode="tail">
              {loc}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
// no me funciono tailwind muy bien asi que lo hice asi
// Me gusta más tener styles abajo
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 12,
    padding: 12,
    borderRadius: 10,
    color: '#666',
    width: '90%',
    height: height / 4.75,
    backgroundColor: '#dbdbdb',
    borderBottomColor: '#cacaca', //haha caca
    borderBottomWidth: height / 160,
    shadowColor: '#000', //Lo siguiente es código para la sombra de las EventCard
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Acá termina el código de la sombra
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventText: {
    paddingLeft: 8,
    flex: 1,
    flexDirection: 'column',
    padding: 4,
  },
  eventPicture: {
    width: height / 5.2,
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
// mas que nada faltaria agregar los iconos aca pero tu le sabes
