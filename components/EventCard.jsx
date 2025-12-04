import { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import noPicture from '../assets/noPicture.png';
import { useTheme } from '../ThemeContext';

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
      <Image style={styles.eventPicture} source={picture} />

      <View style={styles.eventText}>
        <Text style={styles.eventTitle} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>

        <View style={styles.categoryContainer}>
          <MaterialIcons name="music-note" size={17} color={styles.icon.color} />
          <Text style={styles.text} numberOfLines={1}>
            {cat}
          </Text>
        </View>

        <View style={styles.categoryContainer}>
          <MaterialIcons name="event" size={17} color={styles.icon.color} />
          <Text style={styles.text}>{fechaFormateada}</Text>
        </View>

        <View style={styles.categoryContainer}>
          <MaterialIcons name="place" size={17} color={styles.icon.color} />
          <Text style={styles.text} numberOfLines={1}>
            {loc}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      margin: 12,
      padding: 12,
      borderRadius: 10,
      width: '90%',
      height: height / 4.75,
      backgroundColor: theme === 'light' ? '#dbdbdb' : '#1e1e1e',
    },
    categoryContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    eventText: {
      paddingLeft: 8,
      flex: 1,
    },
    eventPicture: {
      width: height / 5.2,
      height: '100%',
      borderRadius: 3,
      backgroundColor: theme === 'light' ? '#0000002d' : '#55555555',
    },
    eventTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme === 'light' ? '#000' : '#fff',
    },
    text: {
      color: theme === 'light' ? '#000' : '#e5e5e5',
    },
    icon: {
      color: theme === 'light' ? '#000' : '#e5e5e5',
    },
  });
