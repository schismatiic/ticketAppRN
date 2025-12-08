import { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import noPicture from '../assets/noPicture.png';
import { useTheme } from '../ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const height = Dimensions.get('window').height;

export default function EventCard({ _id, name, category, location, date, image, tickets }) {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState('');
  const [loc, setLoc] = useState('');
  const [cat, setCat] = useState('');

  const fechaFormateada = new Date(date).toLocaleDateString('es-CL');

  useEffect(() => {
    const toTitle = (str) =>
      str
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

    setPicture(image === '' ? noPicture : { uri: image });
    setTitle(toTitle(name));
    setLoc(toTitle(location));
    setCat(toTitle(category));
  }, [name, image, location, category]);

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: '/EventDetail',
          params: { _id, name, category, location, date, image, tickets: JSON.stringify(tickets) },
        })
      }>
      <View>
        <Image style={styles.eventPicture} source={picture} />

        <LinearGradient // Horizontal
          colors={[theme === 'light' ? '#dbdbdb' : '#1e1e1e', 'transparent']}
          locations={[0, 0.6]} // porcentaje que ocupara la gradiente
          start={{ x: 1, y: 0.5 }} // start from right
          end={{ x: 0, y: 0.5 }} // fade to left
          style={styles.leftGradient}
        />
      </View>
      <Text style={styles.eventTitle} numberOfLines={2} ellipsizeMode="tail">
        {title}
      </Text>
      <View style={styles.eventText}>
        <View>
          <View style={styles.categoryContainer}>
            <MaterialIcons
              name="label" //le cambie el icono de musica a una etiqueta porque no siempre va a ser un concierto
              size={17}
              color={styles.icon.color}
            />
            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
              {cat}
            </Text>
          </View>

          <View style={styles.categoryContainer}>
            <MaterialIcons name="event" size={17} color={styles.icon.color} />
            <Text style={styles.text}>{fechaFormateada}</Text>
          </View>

          <View style={styles.categoryContainer}>
            <MaterialIcons name="place" size={17} color={styles.icon.color} />
            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
              {loc}
            </Text>
          </View>
        </View>
        <View style={styles.nextIcon}>
          <MaterialIcons name="chevron-right" size={30} color={styles.text.color} />
        </View>
      </View>
    </Pressable>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      margin: 12,
      borderRadius: 10,
      width: '90%',
      height: height / 5,
      backgroundColor: theme === 'light' ? '#dbdbdb' : '#1e1e1e',
    },
    categoryContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      width: '100%',
    },
    nextIcon: {
      marginLeft: 'auto',
      paddingBottom: 4,
    },
    eventText: {
      width: '100%',
      marginTop: 'auto',
      marginBottom: '8',
      marginLeft: 'auto',
      paddingRight: 8,
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    eventPicture: {
      position: 'relative',
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
      width: height / 4.75,
      height: '100%',
      backgroundColor: theme === 'light' ? '#0000002d' : '#55555555',
    },
    eventTitle: {
      borderTopWidth: height / 256,
      borderTopColor: '#ff0066',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      flexShrink: 1,
      width: '100%',
      position: 'absolute',
      fontSize: 18,
      fontWeight: 'bold',
      paddingLeft: 8,
      paddingRight: 8,
      paddingBottom: 1,
      paddingTop: 1,
      color: theme === 'light' ? '#000' : '#fff',
      backgroundColor: theme === 'light' ? 'rgba(219, 219, 219, 0.4)' : 'rgba(30, 30, 30, 0.33)',
    },
    imageWrapper: {
      position: 'relative',
      width: height / 4.75,
      height: '100%',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      overflow: 'hidden',
    },

    leftGradient: {
      position: 'absolute',
      right: 0,
      top: 0,
      width: '100%',
      height: '100%',
    },
    text: {
      color: theme === 'light' ? '#000' : '#e5e5e5',
      flexShrink: 1,
      width: '85%',
    },
    icon: {
      color: '#ff0066',
    },
  });
