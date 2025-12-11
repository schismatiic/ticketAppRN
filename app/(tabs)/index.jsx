import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import { useGetEvents } from '@/useHooks/useEvents';
import { useEffect, useState, lazy, Suspense } from 'react';
import tuxGif from '../../assets/linux-tux.gif';
import { SearchBar } from 'components/SearchBar';
import { useTheme } from '../../ThemeContext';
import { RefreshControl } from 'react-native';

const height = Dimensions.get('window').height;
const LazyCard = lazy(() =>
  import('../../components/EventCard').then((m) => ({ default: m.default }))
);

export default function Tab() {
  const { getEvents, data, isLoading, error } = useGetEvents();
  const [tux, setTux] = useState(null);
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    setEvents([]);       // borra los eventos
    setPage(1);          // vuelve a la primera página

    await getEvents({ page: 1, limit: 10 });

    setRefreshing(false);
  };

  const styles = getStyles(theme);

  useEffect(() => {
    if (!data) {
      getEvents({ page, limit: 10 });
    }
  }, [page]);

  useEffect(() => {
    if (error) {
      Alert.alert('Ups, hubo un problema', error.message || 'No se pudieron cargar los eventos.', [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Reintentar',
          onPress: () => getEvents({ page, limit: 10 }),
        },
      ]);
    }
  }, [error]);

  const loadEvents = () => {
    if (!isLoading) {
      const j = page + 1;
      setPage(j);
      getEvents({ page: j, limit: 10 });
    }
  };

  useEffect(() => {
    const i = Math.floor(Math.random() * 11);
    setTux(i === 10);
  }, []);

  useEffect(() => {
    if (data?.data) {
      setEvents((arr) => [...arr, ...data.data]);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <SearchBar onSearch={getEvents} setEvents={setEvents} />

      <FlatList
        data={events}
        keyExtractor={(item) => item._id}
        onEndReached={loadEvents}
        onEndReachedThreshold={0.2}
        contentContainerStyle={styles.content}

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme === 'light' ? '#000' : '#fff'}
          />
        }

        renderItem={({ item }) => (
          <Suspense>
            <LazyCard
              _id={item._id}
              name={item.name}
              category={item.category}
              image={item.image}
              location={item.location}
              date={item.date}
              tickets={item.tickets}
            />
          </Suspense>
        )}
      />

      {isLoading && (
        <View style={styles.spinner}>
          {tux ? (
            <Image source={tuxGif} style={styles.tux} />
          ) : (
            <ActivityIndicator size="large" color={theme === 'light' ? '#0000ff' : '#00ffff'} />
          )}
          <Text style={{ color: theme === 'light' ? '#000' : '#fff', marginTop: 8 }}>Loading</Text>
        </View>
      )}
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#fff' : '#000000e5',
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
