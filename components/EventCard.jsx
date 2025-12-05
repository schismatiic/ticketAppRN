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
          locations={[0.05, 0.95]}
          start={{ x: 1, y: 0.5 }} // start from right
          end={{ x: 0, y: 0.5 }} // fade to left
          style={styles.leftGradient}
        />

        <LinearGradient // Vertical
          colors={[theme === 'light' ? '#dbdbdb' : '#1e1e1e', 'transparent']}
          locations={[0, 0.35]}
          start={{ x: 0.5, y: 0 }} // start from right
          end={{ x: 0.5, y: 1 }} // fade to left
          style={styles.leftGradient}
        />
      </View>
      <Text style={styles.eventTitle} numberOfLines={2} ellipsizeMode="tail">
        {title}
      </Text>
      <View style={styles.eventText}>
        <View>
          <View style={styles.categoryContainer}>
            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
              {cat}
            </Text>
            <MaterialIcons name="music-note" size={17} color={styles.icon.color} />
          </View>

          <View style={styles.categoryContainer}>
            <Text style={styles.text}>{fechaFormateada}</Text>
            <MaterialIcons name="event" size={17} color={styles.icon.color} />
          </View>

          <View style={styles.categoryContainer}>
            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
              {loc}
            </Text>
            <MaterialIcons name="place" size={17} color={styles.icon.color} />
          </View>
        </View>
        <View style={styles.nextIcon}>
          <MaterialIcons name="navigate-next" size={32} color={styles.text.color} />
        </View>
      </View>
    </Pressable>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      borderTopColor: '#ff0066',
      borderTopWidth: height / 105,
      display: 'flex',
      flexDirection: 'row',
      margin: 12,
      borderRadius: 10,
      width: '90%',
      height: height / 4.75,
      backgroundColor: theme === 'light' ? '#dbdbdb' : '#1e1e1e',
    },
    categoryContainer: {
      marginLeft: 'auto',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    nextIcon: {
      marginLeft: 'auto',
      paddingBottom: 4,
    },
    eventText: {
      width: '100%',
      marginTop: 'auto',
      marginLeft: 'auto',
      paddingRight: 8,
      flex: 1,
      alignItems: 'center',
    },
    eventPicture: {
      position: 'relative',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      width: height / 4.75,
      height: '100%',
      backgroundColor: theme === 'light' ? '#0000002d' : '#55555555',
    },
    eventTitle: {
      flexShrink: 1,
      width: '100%',
      padding: 4,
      position: 'absolute',
      fontSize: 20,
      fontWeight: 'bold',
      color: theme === 'light' ? '#000' : '#fff',
      textShadowColor: theme === 'light' ? '#dbdbdb' : '#1e1e1e',
      textShadowRadius: 6,
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
