import {
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
//import EventCard from 'components/EventCard';
import { useGetEvents } from '@/useHooks/useEvents';
import { useEffect, useState, lazy, Suspense } from 'react';
import tuxGif from '../../assets/linux-tux.gif';
import { SearchBar } from 'components/SearchBar';

const height = Dimensions.get('window').height;
const LazyCard = lazy(() =>
  import('../../components/EventCard').then((m) => ({
    default: m.default,
  }))
);

export default function Tab() {
  const { getEvents, data, isLoading, error } = useGetEvents(); // hay que modificar el hook para el lazy scrolling
  const [tux, setTux] = useState(null); // hay que poner el tux hehe
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!data) {
      getEvents({ page, limit: 10 });
    }
  }, [page]);

  const loadEvents = () => {
    if (!isLoading) {
      const j = page + 1;
      setPage(j);
      getEvents({ page: j, limit: 10 });
    }
  };

  useEffect(() => {
    const i = Math.floor(Math.random() * 11);
    if (i === 10) {
      setTux(true);
    } else {
      setTux(false);
    }
  }, []);

  useEffect(() => {
    if (data?.data) {
      setEvents((arr) => [...arr, ...data.data]); // hacemos append al array antiwo con los eventos cargados
    }
  }, [data]);

  console.log(events);
  // reemplaze el scrollview por un view porque el flatlist explota dentro del scrollview
  return (
    <View style={styles.container} contentContainerStyle={styles.content}>
      <SearchBar onSearch={getEvents} setEvents={setEvents} />
      <FlatList
        data={events}
        keyExtractor={(item) => item._id}
        onEndReached={loadEvents}
        onEndReachedThreshold={0.2}
        renderItem={({ item }) => (
          <Suspense>
            <LazyCard
              name={item.name}
              category={item.category}
              image={item.image}
              location={item.location}
              date={item.date}
              tickets={item.tickets} // añadí los tickets pa mostrarlos en el detalle
            />
          </Suspense>
        )}
      />

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
    </View>
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
