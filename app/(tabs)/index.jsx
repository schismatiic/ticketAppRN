import {
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  Image,
  Dimensions,
} from 'react-native';
import EventCard from 'components/EventCard';
import { useGetEvents } from '@/useHooks/useEvents';
import { useEffect, useState } from 'react';
import tuxGif from '../../assets/linux-tux.gif';

const height = Dimensions.get('window').height;

export default function Tab() {
  const { getEvents, data, isLoading, error } = useGetEvents(); // hay que modificar el hook para el lazy scrolling
  const [tux, setTux] = useState(null); // hay que poner el tux hehe
  const events = data?.data || [];

  useEffect(() => {
    const i = Math.floor(Math.random() * 11);
    if (i === 10) {
      setTux(true);
    } else {
      setTux(false);
    }
    getEvents({ limit: 24 });
  }, []);

  console.log(events);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {events.map((e) => (
        <EventCard
          key={e._id}
          name={e.name}
          category={e.category}
          location={e.location}
          image={e.image}
          date={e.date}></EventCard>
      ))}
      {isLoading && !tux ? (
        <View className="flex-1 items-center justify-center" style={styles.spinner}>
          <ActivityIndicator size={'large'} color={'#0000ff'} />
          <Text>Loading</Text>
        </View>
      ) : null}
      {isLoading && tux ? (
        <View className="flex-1 items-center justify-center" style={styles.spinner}>
          <Image source={tuxGif} style={styles.tux} />
          <Text>Loading</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}
// por aburrimiento hice que un 10% de las veces en vez de un spinner sale un tux
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: { alignItems: 'center' },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tux: {
    margin: 16,
    height: height / 12,
    width: height / 12,
  },
});
